<template>
  <div class="feedback-container">
    <h1
      class="font-weight-bold text-uppercase text-center accent--text my-12"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-3'"
    >
      Feedback
    </h1>
    <div class="text-container">
      <p>
        Here you can leave us audio feedback. Your feedback can be completely
        anonomous or, if you choose you can leave us your contact information in
        the message.
      </p>
    </div>
    <div>
      <TheVisualizer :stream="stream" />
    </div>
    <div class="py-4">
      <TheVoiceRecorder @stream="onStream" @result="onResult" />
    </div>
    <div v-if="recording" class="text-container d-flex align-center">
      <audio style="width: 100%" :src="recording" controls />
      <v-btn class="ml-4" color="primary" dark @click="submitFeedback"
        ><v-icon dark left>{{ icon.submit }}</v-icon> Submit</v-btn
      >
    </div>
    <div v-show="submitted" class="text-container">
      Thanks for your feedback 😀
    </div>
    <div v-if="error" class="error--text text-container">{{ error }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mdiCheckCircle } from "@mdi/js";
import { createObjectURL } from "blob-util";
import { getDatabaseName, generateDocId } from "@/utils/pouchdb-utils";
import TheVoiceRecorder from "@/components/TheVoiceRecorder.vue";
import TheVisualizer from "@/components/TheVisualizer.vue";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
  components: {
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
    localRecordingsDB() {
      return getDatabaseName("local", this.selectedCamp, "recordings");
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
        const recordingName = `recordings.${extension}`;
        const doc = {
          _id: docId,
          locale: this.$i18n.locale,
          _attachments: {
            [recordingName]: {
              content_type: contentType,
              data: this.blob
            }
          }
        };
        await this.$pouch.put(doc, {}, this.localRecordingsDB);
        const info = await this.$pouch.info(this.localRecordingsDB);
        this.updateToUploadRecordingsCount(info.doc_count);

        this.submitted = true;
        this.recording = null;
        setTimeout(() => {
          this.submitted = false;
        }, 2000);
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>
