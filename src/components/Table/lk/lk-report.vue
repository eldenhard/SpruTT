<template>
  <div>
    <b-tabs content-class="mt-3" justified>
      <b-tab title="БДР" active><div style="display: block;"><lkBDR></lkBDR></div></b-tab>
      <b-tab title="БРОС вагоны"><p><lkBROC></lkBROC></p></b-tab>
      <b-tab title="KPI"><p><lkKPI></lkKPI></p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style scoped>
</style>


<script>
import lkBDR from "@/components/Table/lk/lk-reports.vue/lk-report-bdr.vue";
import lkBROC from "@/components/Table/lk/lk-reports.vue/lk-report-broc.vue";
import lkKPI from "@/components/Table/lk/lk-reports.vue/lk-report-kpi.vue";

export default {
  data() {
    return {
        
    };
  },
  components: { lkBDR, lkBROC, lkKPI },
};
</script>