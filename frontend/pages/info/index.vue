<template>
  <div>
    <div class="display-3 text-center py-12">
      Information
    </div>
    <p>
      Here we show information in two main categories; general information that
      does not get updated very often and announcements which can be updated
      regurally.
    </p>
    <div>
      <v-row>
        <v-col>
          <v-checkbox v-model="showAnnouncements" class="mx-2">
            <template v-slot:label>
              <v-icon left color="primary">mdi-bullhorn-outline</v-icon>
              Announcements
            </template>
          </v-checkbox> </v-col
        ><v-col>
          <v-checkbox v-model="showGeneralInfo" class="mx-2">
            <template v-slot:label
              ><v-icon left color="blue">mdi-information-outline</v-icon>General
              Information</template
            ></v-checkbox
          >
        </v-col>
        <v-col>
          <v-select
            :items="items"
            label="Categories"
            hint="Filter the content by category"
            persistent-hint
            :menu-props="{ maxHeight: '400' }"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <InformationItems />
  </div>
</template>

<script>
import InformationItems from "@/components/InformationItems";
export default {
  components: { InformationItems },
  data() {
    return {
      showAnnouncements: true,
      showGeneralInfo: true,
      items: [
        "food",
        "shelter",
        "non food items",
        "health",
        "water sanitation",
        "well being",
        "protection",
        "education"
      ]
    };
  }
};
</script>
