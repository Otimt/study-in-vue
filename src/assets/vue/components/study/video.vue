<script>
    export default {
        props: ['activeSectionObj'],
        data(){
            return {
                playbackSpeedIndex:2,//倍速
                speedList:[0.5,0.75,1,1.5,2]
            };
        },
        created () {
        },
        methods: {
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
    .course-video{
        position:relative;
        width:640px;
        height:480px;
        background:#000;
    }
    .speed-box{
        position: absolute;
        top:0;
        right:0;
        width:90px;
        height:20px;
    }
</style>
<template>
    <div class="w h">
        <div class="course-video">
            <video id="course-video" :src="activeSectionObj.mp4" class="w h" controls></video>
            <div class="speed-box white ar pr5"><span @click="speedDown" class="cur-p">«</span> {{speedList[playbackSpeedIndex]}}×倍速 <span @click="speedUp" class="cur-p">»</span></div>
        </div>
    </div>
</template>