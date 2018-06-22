<script>
    export default {
        props: ['activeSectionObj'],
        data(){
            return {
            };
        },
        methods: {
        }
    }
</script>
<style>
    .el-scrollbar__view{
        height:calc(100% - 40px);
    }
    .course-pdf{
        position:relative;
        background:#000;
    }
</style>
<template>
    <div class="w h">
        <div class="right-tool-bar"></div>
        <div class="course-pdf w h">
            <iframe  id="pdfFrame" :src="'../iframe/pdf/web/viewer-pdf.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
        </div>
    </div>
</template>