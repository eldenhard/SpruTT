<template>
  <div id="tableMain" style="background: white">
    <Loader :loader="loader"></Loader>
    
    <!-- <FilterWagon @updateFilters="updateFilters"></FilterWagon> -->
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Основные" active>
            <b-card-text>
              <WPMainData />
            </b-card-text></b-tab
          >

        </b-tabs>
      </b-card>
    </div>
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
    
