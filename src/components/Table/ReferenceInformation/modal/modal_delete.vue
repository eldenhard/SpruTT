<template>
    <div>
        <span class="question">Вы действительно хотите удалить сотрудника ? </span><br>
        <span class="data">
            {{ info[0]?.last_name }} {{ info[0]?.first_name }} <br>
            {{ info[0]?.post }} {{ info[0]?.email }}</span>
        <div class="btn_group">
            <button class="Cancel" @click="$bvModal.hide('delete_user')">Отмена</button>
            <button class="Delete" @click="deleteUser()">Удалить</button>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>

<script>
import api from "@/api/staff";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
    components: { Loader, Notifications },
    props: ['info'],
    data() {
        return {
            loader: false,
            // Уведомления
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    methods: {
        deleteUser() {
            api.deleteUser(this.info[0]['id'])
                .then((response) => {
                    this.loader = false
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Пользователь удален";
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    this.$emit('getData')
                    setTimeout(() => {
                        this.showNotify = false
                        this.$bvModal.hide('delete_user')
                    }, 1500)
                }).catch((err) => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    console.log(err)
                    this.notifyMessage = 'Удалить сотрудника не удалось';
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => this.showNotify = false, 1500)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    text-align: center;
}

.question {
    text-align: center;
    font-size: 24px;

}

.data {
    font-size: 19px;

}

.btn_group {
    display: flex;
    justify-content: space-evenly;
    margin-top: 6%;

    button {
        width: 25%;
        border-radius: 5px;
    }
}
</style>