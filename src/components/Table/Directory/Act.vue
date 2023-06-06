<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  name: "Act",
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    navigator.clipboard.readText()
      .then((response) => {
        this.text = response;
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  },
  methods: {},
};
</script>