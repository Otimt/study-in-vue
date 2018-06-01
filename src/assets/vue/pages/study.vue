<style>

</style>
<template>
    <div>
        学习
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
            }
        },
        created(){
            console.log(this.$store.state)
            console.log(this.$store.state.activeChapter)
        },
        methods: {

        },
        components: {}
    }
</script>