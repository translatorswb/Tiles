<template>
  <div>
    <div v-for="(item, i) in announcements" :key="i">
      <v-list-item>
        <v-list-item-content @click="test">
          <v-row>
            <v-col class="shrink">
              <div class="font-weight-thin caption pb-1">
                {{ item.date.getYear() + 1900 }}
              </div>
              <div class="subtitle-1" style="line-height: 1.2em">
                {{ getDisplayMonth(item.date) }}&nbsp;{{
                  item.date.getDay() + 1
                }}
              </div>
            </v-col>
            <v-col>
              <v-list-item-title
                class="headline"
                v-text="item.title"
              ></v-list-item-title>
              <v-subheader v-text="item.info"></v-subheader
            ></v-col>
          </v-row>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-btn fab dark small color="primary">
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>
      <v-divider
        v-if="item.title != announcements[announcements.length - 1].title"
        :key="i"
      ></v-divider>
    </div></div
></template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["announcements"]),
    ...mapGetters(["getDisplayMonth"])
  },
  methods: {
    test() {
      console.log("go");
    }
  }
};
</script>

<style>
</style>