<template>
  <div>
    <div role="group">
      <b-form-input
        id="input-live"
        v-model="WagonNumber"
        :state="nameState"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Введите номер вагона, при вводе множества,укажите их через пробел (12345678 12345687)"
        @change="updateSearchTelegram"
        trim
        style="border: 1px solid grey !important"
      >
      </b-form-input>
      <b-form-invalid-feedback id="input-live-feedback">
        номер вагона 8 символов
      </b-form-invalid-feedback>

    </div>

  </div>
</template>


<style>
#input-live {
  width: 100%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  height: 50px;
}
.search {
  width: 10%;
  float: right;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "telegram-search",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
    nameState() {
      return this.WagonNumber.length >= 8 ? true : false;
    },
  },
  data() {
    return {
      WagonNumber: "",
    };
  },
  methods: {
    updateSearchTelegram() {
      this.$emit("updateSearchTelegram", this.WagonNumber);
    },
  },
};
</script>
