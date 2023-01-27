<template>
  <div id="tableMain" style="background: white">
    <Loader :loader="loader"></Loader>
    
    <!-- <FilterWagon @updateFilters="updateFilters"></FilterWagon> -->

              <WPMainData />

  </div>
</template>

    
<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
// import FilterWagon from "@/components/filter/FilterWagon.vue";
import Loader from "@/components/loader/loader.vue";
import WPMainData from "./WagonPark/WPMainData.vue";
export default {
  name: "WagonTable",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  components: { Loader, WPMainData},
  data() {
    return {
      loader: false,
    };
  },
  methods: {
    updateFilters(filters) {
      this.filters = filters;
    },
  },
};
</script>
    
