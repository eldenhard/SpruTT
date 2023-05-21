<template>
    <div v-if="modal_notifications" class="modal_notifications">
        <div class="header">
            <h5>Уведомления</h5>
            <i style="float: right" @click="$emit('close')">
                <img src="@/assets/cross.png" alt="">
            </i>
        </div>
        <hr>
    <div class="content">
        <p>Имя файла</p>
        <p>дата создания</p>
        <p>статус</p>
    </div>
    </div>
</template>

<script>
export default {
    props: {
        modal_notifications: false
    }
}
</script>

<style scoped>
.modal_notifications {
    position: absolute;
    top: 2%;
    right: 1%;
    background: rgba(238, 238, 238, 0.5);
    z-index: 999999999;
    width: 30%;
    height: auto;
    height: 20vh;
    max-height: 25vh;
    overflow: auto;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    transform: translateX(-150%);
    animation: ani 1s forwards;
}

@keyframes ani {
    0% {
        transform: translateX(150%);
    }

    100% {
        transform: translateY(0);
    }
}
.header>h5 {
    color: rgb(202, 202, 202);
}

i {
    cursor: pointer;
}
hr {margin: 0; padding: 0;}
.header {
    display: flex;
    justify-content: space-between;
    padding: 2% 3% 0 2%;

}
.content{
    display: flex;
    justify-content: space-between;
    padding: 0% 3% 0 2%;
    border: 1px solid #cfcfcf ;

}
</style>

