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
    .w700{width:700px;}
    .course-pdf{
        position:relative;
        width:700px;
        height:360px;
        background:#000;
    }
</style>
<template>
    <div class="w h">
        <div class="course-pdf">
            <iframe  id="pdfFrame" :src="'../iframe/pdf/web/viewer-pdf.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
        </div>
    </div>
</template>