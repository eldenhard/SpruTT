<template>
    <div class="block" v-if="watch_block">
        <div class="block_content" v-show="watch_hello">
            <div class="block_header">
                <p>Добро пожаловать в <em>СПРУТТ</em></p>
            </div>
            <div class="block__main">
                <p> пользователь: {{ lastname }} {{ firstname }} </p>
            </div>
            <div class="block__footer"> <img src="../assets/logo_comp.png" alt=""></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['watch_hello', 'firstname', 'lastname'],
    data() {
        return {
            watch_block: false
        }
    },
    mounted() {
        if (this.$store.state.auth.isLoggedIn) {
            console.lo
            // setTimeout(() => {
            //     this.watch_block = false
            // },5000)

        } else {
            this.watch_block = true
        }
    }
}
</script>


<style  scoped>
.block {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../assets/back_img.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.block_content {
  will-change: animation;
  animation: animate 1.2s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes animate {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}
.block_header p {
  font-size: max(4vw, 25px);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #eeeeee;
}

.block__main p {
  font-size: max(2vw, 16px);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  color: #999999;
}

.block__footer {
  margin-top: 2%;
}

</style>