<template>
  <section class="header">
    <h4 class="description"><slot></slot></h4>
    <input
      type="text"
      :placeholder="placeholder_value"
      @input="updateApplication($event.target.value)"
    />
  </section>
</template>


<script>
export default {
  props: {
    placeholder_value: String,
  },
  methods: {
    updateApplication(value) {
      this.$emit("updateApplication", value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/style.scss";
</style>