<script>
    import ComponentLrc from  "../part/lrc.vue";
    import ComponentSpeed from  "../part/play-speed.vue";
    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc,
            'speed' : ComponentSpeed
        },
        data(){
            return {
                playbackSpeedIndex:2,//倍速
                lrcVisible:true,
                time:0,
            };
        },
        watch:{
            "$route.params":"restoreSpeed"
        },

        mounted () {
            document.getElementById("course-video").addEventListener("timeupdate",this.setCurrentTime)
        },
        beforeDestroy(){
            document.getElementById("course-video").removeEventListener("timeupdate",this.setCurrentTime);
        },
        methods: {
            restoreSpeed(){
                this.playbackSpeedIndex = 2;//还原到1倍速
            },
            setCurrentTime(e){
                var video = e.target;
                this.time = video.currentTime;
            },
            setSpeed(speedIndex,speed){
                this.playbackSpeedIndex = speedIndex;
                var myVid=document.getElementById("course-video");
                myVid.playbackRate=speed;
            },
        }
    }
</script>
<style>
    .el-scrollbar__view{
        height:calc(100% - 40px);
    }
    .course-video{
        position:relative;
        background:#000;
    }
    .speed-box{
        height:60px;
    }
    .lrc-ctrl{
        width:65px;
        height:60px;
    }
    .lrc-ctrl .el-switch,.lrc-ctrl .el-switch__core{
        height:14px;
    }
    .lrc-ctrl .el-switch__core:after{
        width:10px;height:10px;
    }
    .lrc-ctrl .el-switch.is-checked .el-switch__core::after{
        margin-left:-11px;
    }
</style>
<template>
    <div class="w h">
        <div class="right-tool-bar">
            <div class="lrc-ctrl left" v-if="activeSectionObj.lrc">
                <template>
                    <el-switch
                            class="ml5"
                            v-model="lrcVisible"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :width="25"
                    ></el-switch>
                    <span class="mr5 white">字幕</span>
                </template>
            </div>
            <speed @speedchanged="setSpeed" :playbackSpeedIndex="playbackSpeedIndex"></speed>
        </div>
        <div class="course-video w h60-besides hide-overflow">
            <video id="course-video" :src="activeSectionObj.mp4" class="w h" controls></video>
            <lrc v-if="activeSectionObj.lrc" v-show="lrcVisible" :time="time" :lrc="activeSectionObj.lrc" style="bottom:60px;"></lrc>
        </div>
    </div>
</template>