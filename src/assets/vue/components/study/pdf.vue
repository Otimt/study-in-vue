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
    .ctrl-box{
        width:700px;
        height:20px;
         line-height:20px;
        background:#474747;
    }
    .ctrl-box .el-switch,.ctrl-box .el-switch__core{
        height:14px;
    }
    .ctrl-box .el-switch__core:after{
        width:10px;height:10px;
    }
    .ctrl-box .el-switch.is-checked .el-switch__core::after{
        margin-left:-11px;
    }
</style>
<template>
    <div class="w h">
        <div class="course-pdf">
            <iframe  id="pdfFrame" :src="'../iframe/pdf/web/viewer-pdf.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
        </div>
    </div>
</template>