<script>
    import ComponentLrc from  "./../part/lrc.vue"
    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc
        },
        data(){
            return {
                playbackSpeedIndex:2,//倍速
                speedList:[0.5,0.75,1,1.5,2],
                lrcVisible:true,
                time:0,
            };
        },
        mounted () {
            document.getElementById("course-video").addEventListener("timeupdate",this.setCurrentTime)
        },
        beforeDestroy(){
            document.getElementById("course-video").removeEventListener("timeupdate",this.setCurrentTime);
        },
        methods: {
            setCurrentTime(e){
                var video = e.target;
                this.time = video.currentTime;
            },
            speedUp(){
                if(this.playbackSpeedIndex<(this.speedList.length-1)){
                    this.playbackSpeedIndex++;
                    var myVid=document.getElementById("course-video");
                    myVid.playbackRate=this.speedList[this.playbackSpeedIndex];
                }
            },
            speedDown(){
                if(this.playbackSpeedIndex>0){
                    this.playbackSpeedIndex--;
                    var myVid=document.getElementById("course-video");
                    myVid.playbackRate=this.speedList[this.playbackSpeedIndex];
                }
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
        position: absolute;
        top:0;
        right:0;
        width:90px;
        height:20px;
    }
    .lrc-ctrl{
        position: absolute;
        top:0;
        left:0;
        width:90px;
        height:20px;
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
        <div class="course-video w h">
            <video id="course-video" :src="activeSectionObj.mp4" class="w h" controls></video>
            <div class="lrc-ctrl">
                <template v-if="activeSectionObj.lrc">
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
            <lrc v-if="activeSectionObj.lrc" v-show="lrcVisible" :time="time" :lrc="activeSectionObj.lrc" style="bottom:60px;"></lrc>
            <div class="speed-box white ar pr5"><span @click="speedDown" class="cur-p">«</span> {{speedList[playbackSpeedIndex]}}×倍速 <span @click="speedUp" class="cur-p">»</span></div>
        </div>
    </div>
</template>