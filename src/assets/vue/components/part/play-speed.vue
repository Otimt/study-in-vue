<script>
    export default {
        props: ['playbackSpeedIndex'],
        data(){
            return {
                speedList:[0.5,0.75,1,1.25,1.5,1.75,2],
            }
        },
        methods:{
            setSpeed(index){
                console.log(index)
                this.$emit('speedchanged',index,this.speedList[index])
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
    }
    .speed-btn{
        width:63px;
        height:20px;
        line-height:20px;
        box-sizing: border-box;
    }
    .speed-btn:hover{
        background:#383b42;
    }
</style>
<template>
    <el-popover placement="bottom" width="46" trigger="hover" class="ml10">
        <div @click="setSpeed(index)" class="speed-btn white cur-p pl10 f12" v-for="(speed , index) in speedList">
            {{speed}}×<i class="el-icon-check" style="color:#13ce66;" v-if="playbackSpeedIndex==index"></i>
        </div>
        <el-button slot="reference" size="mini ac">{{speedList[playbackSpeedIndex]}}×</el-button>
    </el-popover>
</template>
