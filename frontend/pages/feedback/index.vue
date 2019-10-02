<template>
  <div class="feedback-container">
    <h1
      class="display-3 font-weight-bold text-uppercase text-center accent--text my-12"
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
      <audio style="width: 100%" :src="recording.src" controls />
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
import { mdiCheckCircle } from "@mdi/js";
import TheVoiceRecorder from "@/components/TheVoiceRecorder.vue";
import TheVisualizer from "@/components/TheVisualizer.vue";

export default {
  components: {
    TheVoiceRecorder,
    TheVisualizer
  },
  data() {
    return {
      icon: {
        submit: mdiCheckCircle
      },
      recording: null,
      error: null,
      stream: null,
      submitted: false
    };
  },
  methods: {
    onStream(stream) {
      console.log("Got a stream object:", stream);
      this.stream = stream;
    },
    onResult(data) {
      this.recording = {
        src: window.URL.createObjectURL(data)
      };
    },
    onError(error) {
      this.error = error;
    },
    submitFeedback() {
      console.log("feedback submitted");
      this.submitted = true;
      this.recording = null;
      setTimeout(() => {
        this.submitted = false;
      }, 2000);
    }
  }
};
</script>
