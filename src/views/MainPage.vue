<template>
  <div class="container_block">
    <div class="content">
      <img src="@/assets/logo3.png" height="7" alt="Логотип компании" />
      <div
        class="content_item"
        v-for="path in element_path"
        :key="path.name"
        @click="goToPage(path.name, path.path)"
      >
        {{ path.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width_element: window.innerWidth,
      element_path: [
        { name: "Справочники", path: "/directory" },
        { name: "Вагонный парк", path: "/wagonpark" },
        { name: "Личный кабинет", path: "/lk" },
        { name: "Отчеты", path: "/report" },
        { name: "Ключевые факты", path: "/key-facts" },
        { name: "Управ. отчетность", path: "/management-reporting" },
        { name: "Справочная информация", path: "/personnel-service" },
        { name: "Страхование", path: "/insurance" },
        { name: "Работа с персоналом", path: "/staff" },
      ],
    };
  },
  mounted() {
    console.log(this.width_element);
    if (this.width_element < 550) {
    }
  },
  methods: {
    goToPage(name, path) {
      if (this.width_element < 550 && name != "Отчеты") {
        this.$toast.info("Это раздел доступен только на ПК\nВедется работа над адаптацией раздела", {
          timeout: 5000,
        });
        return
      }
      this.$router.push({ path: path });
    },
  },
};
</script>


<style scoped>
.container_block {
  height: 100dvh;
  background: url(../assets/back_img.webp) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
}
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  gap: 2%;
  height: 80%;
  margin-top: 3.5%;
}
.content_item {
  background: rgba(8, 8, 8, 0.7);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: lighter;
  font-size: 1.5em;
  transition: transform 0.3s;
}
.content_item:hover {
  transform: translate(0, -2%);
}
img {
  display: none;
}
@media screen and (min-width: 1024px) {

  .content {
    grid-template-columns: repeat(3, 1fr); /* Три колонки */
  }
}

/* Стили для средних экранов (laptop, tablet landscape) */
@media screen and (max-width: 1023px) and (min-width: 768px) {
  img {
    display: block;
    width: 60%;
    height: 40px;
    margin: 0 auto;
  }
  .content {
    display: flex;
    flex-direction: column;
    grid-template-columns: repeat(2, 1fr); /* Две колонки */
    margin-top: 10%;
  }
  .content_item{
    padding: 1% 0;
  }
}

/* Стили для маленьких экранов (mobile) */
@media screen and (max-width: 767px) {
  .content {
    margin-top: 15% !important;
    grid-template-columns: repeat(1, 1fr); /* Одна колонка */
  }
  img {
    display: block;
    width: 80%;
    height: 40px;
    margin: 0 auto;
  }
}
</style>