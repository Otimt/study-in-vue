<script>
    export default {
        data(){
            return {
                selectedPDFModel:this.$store.state.selectedPDFModel,//auto or not
            }
        },
        methods:{
            setModel(model){
                this.selectedPDFModel = model;
                this.$store.commit("SET_PDF_MODEL",model);//速度保存到vuex
                this.$emit('pdfmodelchanged');
            }
        }
    }
</script>
<style>
    .el-popover{
        padding:0;
        min-width:65px;
        background:#3e4147;
        border-radius:0;
        border:none;
    }
    .el-popover .popper__arrow{
        display:none;
    }
    .speed-btn{
        height:47px;
    }

    .speed-change-btn{
        width:63px;
        height:20px;
        line-height:20px;
        box-sizing: border-box;
    }
    .speed-change-btn:hover{
        background:#383b42;
    }

</style>
<template>
    <el-popover placement="bottom" width="46" trigger="hover" class="ml10">
        <div @click="setModel('not')" class="speed-change-btn white cur-p pl10 f12 ac">
            手动<i class="el-icon-check" style="color:#13ce66;" v-if="selectedPDFModel!='auto'"></i><i v-else>&nbsp;&nbsp;&nbsp;</i>
        </div>
        <div @click="setModel('auto')" class="speed-change-btn white cur-p pl10 f12 ac">
            自动<i class="el-icon-check" style="color:#13ce66;" v-if="selectedPDFModel=='auto'"></i><i v-else>&nbsp;&nbsp;&nbsp;</i>
        </div>
        <div slot="reference" class="ac white speed-btn dis-i cur-p">PDF</div>
    </el-popover>
</template>
