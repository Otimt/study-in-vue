<script>
    export default {
        data(){
            return {
                selectedSpeed:this.$store.state.selectedSpeed,
                speedList:this.$store.state.speedList,
            }
        },
        methods:{
            setSpeed(index){
                this.selectedSpeed = index;
                this.$store.commit("SET_SELECTED_SPEED",index);//速度保存到vuex
                this.$emit('speedchanged',Number(this.speedList[index]));
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
        <div @click="setSpeed(index)" class="speed-change-btn white cur-p pl10 f12" v-for="(speed , index) in speedList">
            {{speed}}×<i class="el-icon-check" style="color:#13ce66;" v-if="selectedSpeed==index"></i>
        </div>
        <div slot="reference" class="ac white speed-btn dis-i cur-p">{{speedList[selectedSpeed]}}×</div>
    </el-popover>
</template>
