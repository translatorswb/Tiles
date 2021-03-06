<template>
  <div class="feedback-container">
    <VTitle>
      <template v-slot:title>
        {{ $t("feedback") }}
      </template>
      <template v-slot:title-append>
        <PlayButtonInstruction :src="audioSrc" />
      </template>
    </VTitle>
    <div class="text-container">
      <p>
        {{ $t("feedbackInstruction") }}
      </p>
    </div>
    <div>
      <TheVisualizer :stream="stream" />
    </div>
    <div v-if="recording" class="text-container d-flex align-center">
      <audio style="width: 100%" :src="recording" controls />
      <v-btn class="ml-4" color="primary" dark @click="submitFeedback"
        ><v-icon dark left>{{ icon.submit }}</v-icon> {{ $t("submit") }}</v-btn
      >
    </div>
    <div class="py-4">
      <TheVoiceRecorder @stream="onStream" @result="onResult" />
    </div>
    <div v-if="error" class="error--text text-container">
      {{ $("tryAgainLater") }}
    </div>
    <v-dialog v-model="submitted" max-width="290">
      <v-card>
        <v-card-title class="headline justify-center">😀</v-card-title>
        <v-card-text>
          {{ $t("feedbackSuccess") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="submitted = false"
            ><v-icon dark left>{{ icon.submit }}</v-icon>
            {{ $t("close") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { mdiCheckCircle } from "@mdi/js";
import { createObjectURL } from "blob-util";
import { getDatabaseName, generateDocId } from "@/utils/pouchdb-utils";
import VTitle from "@/components/VTitle";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
import TheVoiceRecorder from "@/components/TheVoiceRecorder.vue";
import TheVisualizer from "@/components/TheVisualizer.vue";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
  components: {
    VTitle,
    PlayButtonInstruction,
    TheVoiceRecorder,
    TheVisualizer
  },
  mixins: [objectURLsMixin],
  data() {
    return {
      icon: {
        submit: mdiCheckCircle
      },
      recording: null,
      blob: null,
      error: null,
      stream: null,
      submitted: false
    };
  },
  computed: {
    ...mapState(["selectedCamp"]),
    ...mapGetters(["hasAudioInstruction"]),
    localRecordingsDB() {
      return getDatabaseName("local", this.selectedCamp, "recordings");
    },
    locale() {
      return this.$i18n.locale;
    },
    audioSrc() {
      const key = "feedback";
      return this.hasAudioInstruction(key, this.locale)
        ? `/audio/${key}/${this.locale}.mp3`
        : null;
    }
  },
  watch: {
    isRecording(value) {
      if (value === true && this.error) {
        this.error = null;
      }
    }
  },
  methods: {
    ...mapActions(["updateToUploadRecordingsCount"]),
    onStream(stream) {
      this.stream = stream;
    },
    onResult(data) {
      this.blob = data;
      const objectURL = createObjectURL(data);
      this.addObjectURL(objectURL);
      this.recording = objectURL;
    },
    async submitFeedback() {
      try {
        const docId = generateDocId();
        const contentType = this.blob.type;
        const extension = contentType.split(";")[0].slice(6);
        const recordingName = `recording.${extension}`;
        const doc = {
          _id: docId,
          locale: this.$i18n.locale,
          camp: this.selectedCamp,
          _attachments: {
            [recordingName]: {
              content_type: contentType,
              data: this.blob
            }
          }
        };
        await this.$pouch.put(doc, {}, this.localRecordingsDB);
        const docs = await this.$pouch.allDocs(
          { include_docs: false },
          this.localRecordingsDB
        );
        const count = docs.rows.length;
        this.updateToUploadRecordingsCount(count);

        this.submitted = true;
        this.recording = null;
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    }
  }
};
</script>
