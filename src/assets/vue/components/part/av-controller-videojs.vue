<script xmlns:v-on="http://www.w3.org/1999/xhtml">
    import ComponentLrc from  "./lrc.vue";
    import ComponentSpeed from  "./play-speed.vue";
    import pdfController from  "./pdf-controller.vue";
    import TestInPlay from  "../test/test-in-play.vue";


    import { videojs,videoPlayer } from 'vue-video-player'
    window.videojs = videojs;//给videojs m3u8插件使用
    require('videojs-contrib-hls/dist/videojs-contrib-hls');

    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc,
            'speed': ComponentSpeed,
            'pdf-controller':pdfController,
            'video-player':videoPlayer,
            'test-in-play':TestInPlay,
        },
        mounted () {
            this.startTimeSlider();
        },
        beforeDestroy(){
            this.stopTimeSlider();
        },
        data(){
            return {
                lrcVisible:true,
                vTime:0,//真·当前时间
                duration:0,//持续时长
                volume:100,//音量
                status:'',//状态
                canplay:false,
                isTimeDraging:false,//时间条正在拖动
                autoSync:this.$store.state.selectedPDFModel!='auto',
            }
        },
        watch:{
            "$route":"resetSelectedPDFModel",
            "autoSync":"setSelectedPDFModel",
        },
        methods: {
            //设置数据
            resetSelectedPDFModel(){
                console.log("重设pdf模式")
                this.$store.commit("SET_PDF_MODEL","auto");
                this.autoSync = false;
            },
            setSelectedPDFModel(){
                if(!this.autoSync){
                    this.$store.commit("SET_PDF_MODEL","auto");
                }else{
                    this.$store.commit("SET_PDF_MODEL","not");
                }
            },
            setTime(){
                var cTime = Number(this.$refs.video.player.currentTime())
                if(!this.isTimeDraging){
                    this.vTime = cTime;
                }
                this.$emit('timeupdate',cTime);
            },
            setDuration(){
                this.duration = Number(this.$refs.video.player.duration());
                this.status = "pause";
            },
            setStatus(type){
                this.status = type;
            },
            onPlayerPlay(e){
                console.log(e);
                this.setStatus("play")
            },
            onPlayerPause(){
                this.setStatus("pause")
            },
            onPlayerEnded(){
                this.setStatus("ended")
            },
            onPlayerLoadeddata(){
                this.setTime()
                this.setDuration()
                this.vSetSpeed()
            },
            isPlaying(){
                return this.status == "play"
            },

            setVolume(e){
                var video = e.target;
                this.volume = video.volume*100
            },
            startTimeSlider(){
                this.isTimeDraging = false;
//                this.stopTimeSlider();
//                this.$refs.video.addEventListener("timeupdate",this.setTime);
            },
            stopTimeSlider(){
                this.isTimeDraging = true;
//                this.$refs.video.removeEventListener("timeupdate",this.setTime);
            },
            sliderDragStart(e){
                console.log("鼠标按下")
                this.stopTimeSlider()
                document.addEventListener("mouseup",this.sliderDragEnd);
            },
            sliderDragEnd(e){
                this.startTimeSlider()
                document.removeEventListener("mouseup",this.sliderDragEnd);
            },
            //操作播放器
            vToggleScreenFull(){
                this.screenfull.toggle();
            },
            vSetVolume(num){
                this.$refs.video.player.volume(num/100)
            },
            vSetSpeed(){
                var selectedSpeed = this.$store.state.selectedSpeed,
                    speedList=this.$store.state.speedList,
                    speed = Number(speedList[selectedSpeed]);
                this.$refs.video.player.playbackRate(Number(speed));
                console.log("设置视频速率"+speed)
            },
            vPlay(){
                window.sss = this.$refs.video.player;
                this.$refs.video.player.play();
            },
            vPause(){
                this.$refs.video.player.pause();
            },
            switchPlay(){
                if(this.status == "play"){
                    this.vPause()
                }else{
                    this.vPlay()
                }
            },
            vSeek(num){
                console.log("跳到"+num)
                this.$refs.video.player.currentTime(num) ;
            },

            /**
             * 时间秒数格式化
             * @param s 时间戳（单位：秒）
             * @returns {*} 格式化后的时分秒
             */
            formatTime(s){
                var t;
                if(s > -1){
                    var hour = Math.floor(s/3600);
                    var min = Math.floor(s/60) % 60;
                    var sec = s % 60;
                    var t = '';
                    if(hour >0) {
                        t = hour + ":";
                    }

                    if(min < 10){t += "0";}
                    t += min + ":";
                    if(sec < 10){t += "0";}
                    t += sec.toFixed(0);
                }
                return t;
            },
        },
        computed: {
            playOption(){
                return this.activeSectionObj
            },
            UIVisible(){
                return this.$store.state.UIVisible;
            },
            isFullScreen(){
                return this.$store.state.isFullScreen;
            },
            playerOptions() {
                var type = "",
                    src = "";
                if(this.activeSectionObj.mp3){
                    type = "audio/mp3";
                    src = this.activeSectionObj.mp3;
                }else if(this.activeSectionObj.mp4){
                    type = "video/mp4";
                    src = this.activeSectionObj.mp4;
                }else if(this.activeSectionObj.m3u8){
                    type = "application/x-mpegURL";
                    src = this.activeSectionObj.m3u8;
                }
                return {
                    controls:false,
                    language: 'en',
                    sources: [{
                        type: type,
                        src: src
                    }],
                }
            }
        }
    }
</script>
<style>
    .vjs-control-bar .el-switch,.vjs-control-bar .el-switch__core{
        margin-top:-2px;
        height:14px;
    }
    .vjs-control-bar .el-switch__core:after{
        width:10px;height:10px;
    }
    .vjs-control-bar .el-switch.is-checked .el-switch__core::after{
        margin-left:-11px;
    }
    .lh-3em{line-height:3em;}

    .lrc-switch-box {
        width:70px;
        min-width:70px;
        text-align: center;
    }
    .full-screen .video-js .vjs-fullscreen-control .vjs-icon-placeholder::before{
        content: "\F109";
    }
</style>
<template>
    <div class="video-player video-player vjs-custom-skin h ">
        <div id="vjs_video_3" x5-video-player-fullscreen="false" x5-video-player-type="h5" x5-playsinline="true" webkit-playsinline="true" playsinline="true" class="video-js vjs-paused vjs_video_3-dimensions vjs-controls-enabled vjs-workinghover vjs-v6 vjs-user-active" lang="zh-cn">
            <video-player  class="video-player-box h"
                           ref="video"
                           :options="playerOptions"
                           :playsinline="true"
                           customEventName="customstatechangedeventname"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
                            @ended="onPlayerEnded($event)"
                            @timeupdate="setTime($event)"
                            @loadeddata="onPlayerLoadeddata($event)"
                            @volumechange="setVolume($event)"
            >


                <!--@waiting="onPlayerWaiting($event)"-->
                <!--@playing="onPlayerPlaying($event)"-->
                <!--@loadeddata="onPlayerLoadeddata($event)"-->

                <!--@canplay="onPlayerCanplay($event)"-->
                <!--@canplaythrough="onPlayerCanplaythrough($event)"-->

                <!--@statechanged="playerStateChanged($event)"-->
                <!--@ready="playerReadied"-->

            </video-player>
            <lrc v-if="playOption.lrc" v-show="lrcVisible"  :time="vTime" :lrc="playOption.lrc" style="bottom:60px;"></lrc>
            <div class="w h t0 b0 l0 r0 pos-abs cover-box" @click="switchPlay" v-show="!autoSync">
                <button class="vjs-big-play-button" type="button"   v-if="(status=='pause') || (status=='ended') || (status=='durationchange')">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
            </div>
            <div class="vjs-control-bar" dir="ltr" v-show="UIVisible || !isPlaying()">
                <div class="vjs-progress-control vjs-control" v-on:mousedown="sliderDragStart">
                    <el-slider class="w" v-model="vTime" :format-tooltip="formatTime" :max="duration" @change="vSeek" ></el-slider>
                </div>
                <button class="vjs-play-control vjs-control vjs-button" type="button"  v-on:click="vPlay" v-if="status=='pause' || (status=='durationchange')">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
                <button class="vjs-play-control vjs-control vjs-button vjs-playing" type="button"  v-on:click="vPause" v-else-if="isPlaying()">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
                <button class="vjs-play-control vjs-control vjs-button vjs-ended" type="button"   v-on:click="vPlay" v-else-if="status=='ended'">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>

                <div class="vjs-current-time vjs-time-control vjs-control">
                    <span class="vjs-current-time-display" >{{formatTime(vTime)}}</span>
                </div>
                <div class="vjs-time-control vjs-time-divider">
                    <div><span>/</span></div>
                </div>
                <div class="vjs-duration vjs-time-control vjs-control">
                    <span class="vjs-duration-display" >{{formatTime(duration)}}</span>
                </div>
                <div class="vjs-volume-panel vjs-control vjs-volume-panel-horizontal">
                    <button class="vjs-mute-control vjs-control vjs-button vjs-vol-3" type="button" title="Mute" aria-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder"></span>
                    </button>
                    <div class="vjs-volume-control vjs-control vjs-volume-horizontal">
                        <el-slider class="w" v-model="volume" :format-tooltip="parseInt" @change="vSetVolume"></el-slider>
                    </div>
                </div>
                <speed @speedchanged="vSetSpeed" class="vjs-playback-rate vjs-control"></speed>
                <div class="lh-3em lrc-switch-box" v-if="playOption.lrc">
                    <span class="dis-i">字幕</span>
                    <el-switch
                            v-model="lrcVisible"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :width="25"
                    ></el-switch>
                </div>
                <div class="lh-3em lrc-switch-box"  v-if="playOption.pdf">
                    <span class="dis-i">大纲</span>
                    <el-switch
                            v-model="autoSync"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :width="25"
                    ></el-switch>
                </div>
                <!--<pdf-controller v-if="playOption.pdf" class="vjs-control lh-3em"></pdf-controller>-->
                <button class="vjs-fullscreen-control vjs-control vjs-button" type="button" @click="vToggleScreenFull">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
            </div>
            <div class="vjs-error-display vjs-modal-dialog vjs-hidden " tabindex="-1"
                 aria-describedby="vjs_video_3_component_389_description" aria-hidden="true" aria-label="Modal Window"
                 role="dialog"><p class="vjs-modal-dialog-description vjs-control-text"
                                  id="vjs_video_3_component_389_description">This is a modal window.</p>
                <div class="vjs-modal-dialog-content" role="document"></div>
            </div>
        </div>
        <test-in-play @showtestandpause="vPause()" @hidetestandcontinue="vPlay()" v-if="activeSectionObj.time2test" :activeSectionObj="activeSectionObj" :time="parseInt(vTime)"></test-in-play>
    </div>
</template>



