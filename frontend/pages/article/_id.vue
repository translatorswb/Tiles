<template>
	<article v-if="article" class="article markdown text-container">
		<h1
			class="article-title flex-grow-1 accent--text font-weight-bold my-6 headline"
		>
			{{ article.title[$i18n.locale] }}
		</h1>
		<div v-if="author" class="mb-4">
			<img alt="logo" class="article-author-logo" :src="author" />
		</div>
		<div v-if="recording" class="mb-4">
			<audio style="width: 100%" :src="recording.src" controls>
				Sorry, your browser doesn't support embedded audios.
			</audio>
		</div>
		<div class="article-content" v-html="content"></div>
	</article>
	<article v-else class="text-container">{{ error }}</article>
</template>

<script>
import showdown from "showdown";
import createDOMPurify from "dompurify";
import { mapState, mapGetters } from "vuex";
import { createObjectURL, blobToDataURL } from "blob-util";
import {
	getDatabaseName,
	getAuthorImage,
	getAudio,
	getAssets
} from "@/utils/pouchdb-utils";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
	mixins: [objectURLsMixin],
	data() {
		return {
			article: null,
			author: null,
			error: null,
			content: null,
			recording: null,
			databaseType: null,
			id: null
		};
	},
	computed: {
		...mapState(["selectedCamp"]),
		...mapGetters(["isLangRtl"]),
		localDB() {
			return getDatabaseName("local", this.selectedCamp, this.databaseType);
		}
	},
	watch: {
		localDB(value) {
			if (value) {
				this.getArticle();
			}
		}
	},
	created() {
		const splitIndex = this.$route.params.id.indexOf("_");
		this.databaseType = this.$route.params.id.slice(0, splitIndex);
		this.id = this.$route.params.id.slice(splitIndex + 1);
		this.getArticle();
	},
	methods: {
		async getArticle() {
			try {
				const doc = await this.$pouch.get(
					this.id,
					{ attachments: true, binary: true },
					this.localDB
				);

				this.article = doc;

				// Get author
				const authorImage = getAuthorImage(doc);
				if (authorImage) {
					this.author = await blobToDataURL(authorImage);
				}

				// Get audio
				const audioBlob = getAudio(doc, this.$i18n.locale);
				if (audioBlob) {
					this.recording = {
						src: createObjectURL(audioBlob)
					};
				}

				// Get markdown file
				const rtl = this.isLangRtl(this.$i18n.locale);
				const converter = new showdown.Converter();
				const DOMPurify = createDOMPurify(window);
				let clean;
				if (rtl) {
					const mdLatinBlog = doc._attachments[`${this.$i18n.locale}_latin.md`];
					const mdLatinText = await mdLatinBlog.data.text();
					const mdArabicBlog =
						doc._attachments[`${this.$i18n.locale}_arabic.md`];
					const mdArabicText = await mdArabicBlog.data.text();

					const dirtyLatin = converter.makeHtml(mdLatinText);
					const dirtyArabic = `<div style="direction: rtl">${converter.makeHtml(
						mdArabicText
					)}</div>`;
					const dirty = `${dirtyLatin} ${dirtyArabic}`;
					clean = DOMPurify.sanitize(dirty);
				} else {
					const mdBlob = doc._attachments[`${this.$i18n.locale}.md`];
					const mdText = await mdBlob.data.text();
					const dirty = converter.makeHtml(mdText);
					clean = DOMPurify.sanitize(dirty);
				}

				// Get images
				const assets = getAssets(doc);
				const assetsNames = Object.keys(assets);
				const assetsObjectURLs = await Promise.all(
					Object.values(assets).map(info => {
						return blobToDataURL(info.data);
					})
				);
				assetsNames.forEach((name, i) => {
					const objectURL = assetsObjectURLs[i];
					this.addObjectURL(objectURL);
					clean = this.replaceAll(clean, name, objectURL);
				});

				this.content = clean;
			} catch (error) {
				this.error = error;
			}
		},
		escapeRegExp(str) {
			return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
		},
		replaceAll(str, find, replace) {
			return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
		}
	}
};
</script>

<style scoped>
.article-author-logo {
	max-width: 240px;
}
</style>
