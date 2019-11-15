<template>
	<div v-resize="onResize">
		<canvas
			ref="canvas"
			class="visualizer-canvas"
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
			dataArray: null,
			binCount: 128
		};
	},
	watch: {
		stream(stream) {
			if (stream) {
				this.audioCtx.resume();
				this.source = this.audioCtx.createMediaStreamSource(stream);
				this.analyser = this.audioCtx.createAnalyser();
				this.analyser.fftSize = this.binCount * 2;
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
			requestAnimationFrame(this.draw);
			this.canvasCtx.fillStyle = "rgb(250, 250, 250)";
			this.canvasCtx.fillRect(0, 0, this.width, this.height);
			const barWidth = this.width / (this.binCount * 2 - 1);
			this.canvasCtx.fillStyle = "rgb(232, 153, 28)";
			const sliceWidth = barWidth * 2;
			let x = 0;
			if (this.stream) {
				this.analyser.getByteTimeDomainData(this.dataArray);
				for (let i = 0; i < this.bufferLength; i++) {
					const v = this.dataArray[i] / 128.0;
					const y = (v * this.height) / 2;
					this.canvasCtx.fillRect(x, y, barWidth, this.height - y * 2);
					x += sliceWidth;
				}
			} else {
				for (let i = 0; i < this.binCount; i++) {
					this.canvasCtx.fillRect(x, this.height / 2 - 1, barWidth, 2);
					x += sliceWidth;
				}
			}
		}
	}
};
</script>

<style scoped>
.visualizer-canvas {
	width: 100%;
}
</style>
