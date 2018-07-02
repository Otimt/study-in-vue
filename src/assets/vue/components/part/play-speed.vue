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
                this.$emit('speedchanged');
            }
        }
    }
</script>
<style>
    .el-popover{
        padding:0;
        min-width:65px;
        background:#1d1f23;
        border-radius:0;
        border:none;
        opacity:0.8;
        margin-top:-8px;
    }
    .el-popover .popper__arrow{
        display:none;
    }
    .speed-btn{
        height:13px;
        margin-top:13px;
    }
    .speed-change-btn{
        width:65px;
        height:24px;
        line-height:24px;
        box-sizing: border-box;
    }
    .speed-change-btn:hover{
        background: #2a3642;
    }
    .speed-change-btn.selected{
        color:#13ce66;
    }
</style>
<template>
    <el-popover placement="bottom" width="46" trigger="hover" >
        <div @click="setSpeed(index)" :class="{'speed-change-btn':true,'ac':true,'white':true,'cur-p':true,'pl10':true,'f12':true,'selected':selectedSpeed==index}" v-for="(speed , index) in speedList">
            {{speed}}×
            <!--<i class="el-icon-check" style="color:#13ce66;" v-if="selectedSpeed==index"></i>-->
        </div>
        <div slot="reference" class="ac white speed-btn dis-i cur-p">{{speedList[selectedSpeed]}}×</div>
    </el-popover>
</template>
