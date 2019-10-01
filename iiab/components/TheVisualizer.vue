<template>
  <div v-resize="onResize">
    <canvas
      class="visualizer-canvas"
      ref="canvas"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
export default {
  props: {
    stream: {
      type: MediaStream,
      default: null
    },
    isRecording: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: 200,
      width: 600,
      audioCtx: null,
      canvasCtx: null,
      source: null,
      analyser: null,
      bufferLength: null,
      dataArray: null
    };
  },
  watch: {
    stream(value) {
      if (value) {
        this.audioCtx.resume();
        this.source = this.audioCtx.createMediaStreamSource(value);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.source.connect(this.analyser);
      } else {
        this.audioCtx.suspend();
      }
      this.draw();
    }
  },
  mounted() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.canvasCtx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
      if (this.canvasCtx) this.draw();
    },
    draw() {
      this.canvasCtx.fillStyle = "rgb(250, 250, 250)";
      this.canvasCtx.fillRect(0, 0, this.width, this.height);
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = "rgb(232, 153, 28)";
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(0, this.height / 2);
      requestAnimationFrame(this.draw);
      if (this.stream && this.isRecording) {
        this.analyser.getByteTimeDomainData(this.dataArray);
        const sliceWidth = (this.width * 1.0) / this.bufferLength;
        let x = 0;
        for (let i = 0; i < this.bufferLength; i++) {
          const v = this.isRecording ? this.dataArray[i] / 128.0 : 1;
          const y = (v * this.height) / 2;
          if (i === 0) {
            this.canvasCtx.moveTo(x, y);
          } else {
            this.canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }
      }
      this.canvasCtx.lineTo(this.width, this.height / 2);
      this.canvasCtx.stroke();
    }
  }
};
</script>

<style scoped>
.visualizer-canvas {
  width: 100%;
}
</style>
