<template>
  <div>
    <div class="display-3 text-center py-12">
      Feedback
    </div>
    <p>
      Here you can leave us audio feedback. Your feedback can be completely
      anonomous or, if you choose you can leave us a number to follow up.
    </p>
    <v-text-field type="number" label="Phone Number"></v-text-field>
    <div class="text-center py-6">
      <v-btn class="mx-2" fab dark large color="red">
        <v-icon dark>mdi-microphone</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>