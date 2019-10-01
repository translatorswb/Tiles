<template>
  <v-row v-if="isRecordingSupported">
    <v-col cols="12" class="voice-recorder-intro text-center">
      <p v-if="!isRecordingSupported" class="error--text">
        Voice recording is not supported. Please try another device.
      </p>
      <p v-else-if="error" class="error--text">{{ error }}</p>
      <p v-else>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias quaerat
        corporis voluptates dolorum dignissimos veritatis quibusdam culpa
        eveniet autem! Dicta, in ducimus sapiente consequatur ipsum neque vitae
        provident repellat nisi.
      </p>
    </v-col>
    <v-col cols="12" class="my-auto text-center">
      <TheVisualizer :is-recording="isRecording" :stream="stream" />
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn
        :color="microphoneColor"
        fab
        x-large
        dark
        :disabled="microphoneDisabled"
        class="my-2"
        @click="toggleRecording"
      >
        <v-icon>{{ microphoneIcon }}</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="modal" persistent max-width="344">
      <v-card>
        <v-card-title>{{ modalTitle }}</v-card-title>
        <v-card-actions class="justify-center">
          <v-btn
            v-show="!submitted"
            color="success"
            dark
            @click="submitFeedback"
            ><v-icon dark left>{{ icon.submit }}</v-icon> Submit</v-btn
          >
          <v-btn v-show="!submitted" color="error" dark @click="cancelFeedback"
            ><v-icon dark left>{{ icon.cancel }}</v-icon> Cancel</v-btn
          >
          <v-btn
            v-show="submitted"
            color="primary"
            dark
            @click="submittedFeedback"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  mdiMicrophone,
  mdiMicrophoneOff,
  mdiCheckCircle,
  mdiCloseCircle
} from "@mdi/js";
import TheVisualizer from "@/components/TheVisualizer.vue";
export default {
  components: {
    TheVisualizer
  },
  data() {
    return {
      icon: {
        microphone: mdiMicrophone,
        microphoneOff: mdiMicrophoneOff,
        submit: mdiCheckCircle,
        cancel: mdiCloseCircle
      },
      isRecording: false,
      isRecordingSupported: true,
      chunks: [],
      error: null,
      mediaRecorder: null,
      stream: null,
      modal: false,
      submitted: false
    };
  },
  computed: {
    microphoneIcon() {
      return this.isRecording ? this.icon.microphoneOff : this.icon.microphone;
    },
    microphoneColor() {
      return this.isRecording ? "error" : "primary";
    },
    microphoneDisabled() {
      return this.error || !this.isRecordingSupported;
    },
    modalTitle() {
      return this.submitted
        ? "Thanks for your feedback! 😀"
        : "Submit your feedback?";
    }
  },
  mounted() {
    this.isRecordingSupported =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  },
  methods: {
    getStream() {
      return navigator.mediaDevices.getUserMedia({ audio: true });
    },
    onStop(e) {
      // const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
      this.chunks = [];
    },
    onDataAvailable(e) {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    },
    toggleRecording() {
      this.isRecording = !this.isRecording;
      this.error = null;
      if (this.isRecording) {
        this.startRecording();
      } else {
        this.stopRecording();
        this.modal = true;
      }
    },
    async startRecording() {
      try {
        this.stream = await this.getStream();
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.onstop = this.onStop;
        this.mediaRecorder.ondataavailable = this.onDataAvailable;
        this.mediaRecorder.start();
      } catch (err) {
        this.error = err;
      }
    },
    stopRecording() {
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    },
    cancelFeedback() {
      this.modal = false;
    },
    submitFeedback() {
      console.log("FEEDBACK SUBMITTED");
      this.submitted = true;
    },
    submittedFeedback() {
      this.modal = false;
      setTimeout(() => {
        this.submitted = false;
      }, 500);
    }
  }
};
</script>

<style scoped>
.voice-recorder-container {
  min-height: 100vh;
}

.voice-recorder-intro {
  max-width: 768px;
  margin: auto;
}
</style>
