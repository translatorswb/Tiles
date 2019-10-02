<template>
  <div class="text-center">
    <v-btn
      :color="microphoneColor"
      fab
      x-large
      dark
      :disabled="!isSupported"
      class="my-2"
      @click="toggleRecording"
    >
      <v-icon>{{ icon.microphone }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiMicrophone } from "@mdi/js";
import MediaRecorderPolyfill from "audio-recorder-polyfill";
export default {
  data() {
    return {
      icon: {
        microphone: mdiMicrophone
      },
      isSupported: false,
      isRecording: false,
      chunks: []
    };
  },
  computed: {
    microphoneColor() {
      return this.isRecording ? "error" : "primary";
    }
  },
  mounted() {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      this.$emit(
        "error",
        new Error("Media Devices are not supported from your browser.")
      );
      return;
    }
    if (!window.MediaRecorder) {
      window.MediaRecorder = MediaRecorderPolyfill;
    }
    this.isSupported = true;
  },
  methods: {
    toggleRecording() {
      if (this.isRecording) {
        this.stop();
      } else {
        this.start();
      }
      this.isRecording = !this.isRecording;
    },
    async start() {
      if (this.isRecording) {
        return;
      }

      try {
        this.$_stream = await this.getStream();
        this.prepareRecorder();
        this.$_mediaRecorder.start();
      } catch (e) {
        this.$emit("error", e);
      }
    },
    stop() {
      if (!this.isRecording) return;
      this.$_mediaRecorder.stop();
      this.$_stream.getTracks().forEach(t => t.stop());
    },
    async getStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.$_stream = stream;
      this.$emit("stream", stream);
      return stream;
    },
    prepareRecorder() {
      if (!this.$_stream) {
        return;
      }

      let mimeType;
      if (MediaRecorder.isTypeSupported("audio/webm; codecs=opus")) {
        // Chrome does not support ogg, but we convert on the server
        mimeType = "audio/webm; codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/ogg; codecs=opus")) {
        // firefox does all we need
        mimeType = "audio/ogg; codecs=opus";
      } else {
        // Polyfill
        mimeType = "audio/wav";
      }

      this.$_mediaRecorder = new MediaRecorder(this.$_stream, {
        mimeType
      });

      this.$_mediaRecorder.ignoreMutedMedia = true;

      this.$_mediaRecorder.addEventListener("start", () => {
        this.isRecording = true;
      });

      this.$_mediaRecorder.addEventListener(
        "dataavailable",
        e => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        },
        true
      );

      this.$_mediaRecorder.addEventListener(
        "stop",
        () => {
          const blobData = new Blob(this.chunks);
          if (blobData.size > 0) {
            this.$emit("result", blobData);
          }
          this.chunks = [];
          this.isRecording = false;
        },
        true
      );
    }
  }
};
</script>
