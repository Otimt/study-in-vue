<script>
    export default {
        data(){
            return {
                directions:"<h3 class='ac'>富文本</h3><p class='t2em'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>"
            };
        },
        created () {
        },
        methods: {
        },
    }
</script>
<style>

</style>
<template>
    <div v-html="directions"></div>
</template>