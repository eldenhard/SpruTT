<template>
    <RegisterInsuredWagons />
</template>



<script>
import RegisterInsuredWagons from '@/components/Table/Directory/RegisterInsuredWagons/RegisterInsuredWagons.vue'

export default {
    components: {
        RegisterInsuredWagons
    },
    mounted() {
        document.title = "Страхование";
    },
}
</script>