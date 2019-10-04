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
import { generateDocId } from "@/utils/pouchdb-utils";
import TheVoiceRecorder from "@/components/TheVoiceRecorder.vue";
import TheVisualizer from "@/components/TheVisualizer.vue";

// const localRecordingsDB = new PouchDB("recordings");
// const remoteRecordingsDB = new PouchDB(
//   "http://localhost:5984/recordings",
//   {
//     fetch(url, opts) {
//       opts.credentials = "include";
//       return PouchDB.fetch(url, opts);
//     }
//   }
// );

// localRecordings.replicate
//   .to(remoteRecordings, {
//     live: true,
//     retry: true
//   })
//   .on("complete", function (info) {
//     // yay, we're done!
//     console.log("We have connected to the DB");
//     console.log(info);
//   })
//   .on("error", function (err) {
//     console.log("THis is fucked");
//     console.log(err);
//     // boo, something went wrong!
//   });

// sendToCouchDB(recordingBlob) {
//   console.log(recordingBlob);
//   console.log(recordingBlob.src);
//   const doc = {
//     _id: new Date().toISOString(),
//     name: "testing"
//     // _attachments:  'This is not working'
//   };
//   console.log("");
//   console.log(doc);
//   this.db
//     .put(doc)
//     .then(doc => {
//       console.log("We wrote stuff to the local db");
//       console.log(doc);
//     })
//     .catch(err => {
//       console.log("ERROR");
//       console.log(err);
//     });
// }

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
      blob: null,
      error: null,
      stream: null,
      submitted: false
    };
  },
  watch: {
    isRecording(value) {
      if (value === true && this.error) {
        this.error = null;
      }
    }
  },
  methods: {
    onStream(stream) {
      this.stream = stream;
    },
    onResult(data) {
      this.blob = data;
      this.recording = {
        src: window.URL.createObjectURL(data)
      };
    },
    async submitFeedback() {
      try {
        const docId = generateDocId();
        const contentType = this.blob.type;
        const extension = contentType.split(";")[0].slice(6);
        const recordingName = `recording.${extension}`;

        const doc = {
          _id: docId,
          _attachments: {
            [recordingName]: {
              content_type: contentType,
              data: this.blob
            }
          }
        };
        const response = await this.$pouch.put(doc, {}, "recordings");
        console.log("New recording ", response);

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
