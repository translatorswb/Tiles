<template>
  <div>
    <v-data-table
      height="300px"
      :headers="tableHeaders"
      :items="tableData"
      :items-per-page="100"
      class="elevation-1"
      :fixed-header="true"
      hide-default-footer
      sort-by="type"
      sort-desc
    >
      <template v-slot:item.type="{ item }">
        <v-icon :color="getColor(item.type)">{{
          getIconType(item.type)
        }}</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mdiBullhornOutline, mdiInformationOutline } from "@mdi/js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tableHeaders: [
        {
          text: "Type",
          align: "left",
          value: "type"
        },
        { text: "Title", value: "title" },
        {
          text: "Date",
          value: "date"
        },
        { text: "From", value: "from" },
        { text: "Category", value: "category" }
      ]
    };
  },
  computed: {
    ...mapState(["announcements"]),
    tableData() {
      const formattedTableData = [];
      this.announcements.forEach(d => {
        console.log(d.date);
        formattedTableData.push({
          type: "Announcement",
          title: d.title,
          date: d.date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          }),
          from: "TWB",
          category: "food"
        });
      });
      return formattedTableData;
    }
  },
  methods: {
    getIconType(name) {
      return name === "Announcement"
        ? mdiBullhornOutline
        : mdiInformationOutline;
    },
    getColor(name) {
      return name === "Announcement" ? "primary" : "blue";
    }
  }
};
</script>

<style></style>
