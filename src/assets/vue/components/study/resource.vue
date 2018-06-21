<script>
    export default {
        props: ['activeSectionObj'],
        data(){
            return {};
        },
        created () {
        },
        methods: {
        }
    }
</script>
<style>

</style>
<template>
    <div>
        <div class="f16">资源</div>
        <div class="f16 mt10" v-for="(res,index) in activeSectionObj.resource">
            <a :href="res.url" target="_blank"><i class="el-icon-download mr10"></i><span>{{res.name}}</span></a>
        </div>
    </div>
</template>