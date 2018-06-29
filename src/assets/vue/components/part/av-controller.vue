<script>
    import ComponentLrc from  "./lrc.vue";
    import ComponentSpeed from  "./play-speed.vue";

//    const DEFAULT_EVENTS = [
//        'loadeddata',
//        'canplay',
//        'canplaythrough',
//        'play',
//        'pause',
//        'waiting',
//        'playing',
//        'ended',
//        'error'
//    ]

    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc,
            'speed': ComponentSpeed,
        },
        mounted () {
            this.startTimeSlider()
            this.$refs.video.addEventListener("loadstart", this.vSetSpeed);
            this.$refs.video.addEventListener("durationchange",this.setDuration);
            this.$refs.video.addEventListener("volumechange",this.setVolume);
            this.$refs.video.addEventListener("pause",this.setStatus);
            this.$refs.video.addEventListener("play",this.setStatus);
            this.$refs.video.addEventListener("ended",this.setStatus);
            this.$refs.video.addEventListener("canplay",this.setCanPlay);
            this.$refs.video.addEventListener("seeking",this.setCanPlay);

            
        },
        beforeDestroy(){
            this.stopTimeSlider()
            this.$refs.video.removeEventListener("loadstart", this.vSetSpeed);
            this.$refs.video.removeEventListener("durationchange",this.setDuration);
            this.$refs.video.removeEventListener("volumechange",this.setVolume);
            this.$refs.video.removeEventListener("pause",this.setStatus);
            this.$refs.video.removeEventListener("play",this.setStatus);
            this.$refs.video.removeEventListener("ended",this.setStatus);
            this.$refs.video.removeEventListener("canplay",this.setCanPlay);
            this.$refs.video.removeEventListener("seeking",this.setCanPlay);
        },
        data(){
            return {
                lrcVisible:true,
                time:0,//当前时间
                duration:0,//持续时长
                volume:100,//音量
                status:'',//状态
                canplay:false,
            }
        },
        methods: {

            //设置数据
            setTime(e){
                var video = e.target;
                this.time = video.currentTime;
            },
            setCanPlay(e){
                this.canplay = e.type;
            },
            setStatus(e){
                console.log(e)
                this.status = e.type;
            },
            setDuration(e){
                var video = e.target;
                this.duration = video.duration;
                this.status = e.type;
            },
            setVolume(e){
                var video = e.target;
                this.volume = video.volume*100
            },
            startTimeSlider(){
                this.stopTimeSlider();
                this.$refs.video.addEventListener("timeupdate",this.setTime);
//                this.$refs.video.removeEventListener("timeupdate",this.setTime);
            },
            stopTimeSlider(){
                this.$refs.video.removeEventListener("timeupdate",this.setTime);
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
            vSetVolume(num){
                this.$refs.video.volume = (num/100)
            },
            vSetSpeed(){
                var selectedSpeed = this.$store.state.selectedSpeed,
                    speedList=this.$store.state.speedList,
                    speed = Number(speedList[selectedSpeed]);
                this.$refs.video.playbackRate=Number(speed);
                console.log("设置视频速率"+speed)
            },
            vPlay(){
                this.$refs.video.play();
            },
            vPause(){
                this.$refs.video.pause();
            },
            vSeek(num){
                console.log("跳到"+num)
                this.$refs.video.currentTime = num;
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
            }
        }
    }
</script>
<style>
    .vjs-control-bar .el-switch,.vjs-control-bar .el-switch__core{
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
        width: 80px;
        text-align: center;
        order:5;
    }
</style>
<template>
    <div class="video-player video-player vjs-custom-skin h ">
        <div id="vjs_video_3" x5-video-player-fullscreen="false" x5-video-player-type="h5" x5-playsinline="true" webkit-playsinline="true" playsinline="true" class="video-js vjs-paused vjs_video_3-dimensions vjs-controls-enabled vjs-workinghover vjs-v6 vjs-user-active" lang="zh-cn">
            <video class="vjs-tech"
                   ref="video"
                   playsinline="playsinline"
                   webkit-playsinline="true"
                   x5-playsinline="true"
                   x5-video-player-type="h5"
                   x5-video-player-fullscreen="false"
                   id="vjs_video_3_html5_api"
                   tabindex="-1"
                   preload="auto"
                   :src="playOption.mp4 || playOption.mp3">
            </video>
            <lrc v-if="playOption.lrc" v-show="lrcVisible" :time="time" :lrc="playOption.lrc" style="bottom:60px;"></lrc>
            <div class="vjs-loading-spinner" dir="ltr">
                <span class="vjs-control-text">Video Player is loading.</span>
            </div>
            <button class="vjs-big-play-button" type="button"  v-on:click="vPlay" v-if="(status=='pause') || (status=='ended') || (status=='durationchange')">
                <span aria-hidden="true" class="vjs-icon-placeholder"></span>
            </button>


            <div class="vjs-control-bar" dir="ltr">
                <div class="vjs-progress-control vjs-control" v-on:mousedown="sliderDragStart">
                    <el-slider class="w" v-model="time" :format-tooltip="formatTime" :max="duration" @change="vSeek" ></el-slider>
                </div>
                <button class="vjs-play-control vjs-control vjs-button" type="button"  v-on:click="vPlay" v-if="status=='pause' || (status=='durationchange')">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
                <button class="vjs-play-control vjs-control vjs-button vjs-playing" type="button"  v-on:click="vPause" v-else-if="status=='play'">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>
                <button class="vjs-play-control vjs-control vjs-button vjs-ended" type="button"   v-on:click="vPlay" v-else-if="status=='ended'">
                    <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                </button>

                <div class="vjs-current-time vjs-time-control vjs-control">
                    <span class="vjs-current-time-display" aria-live="off">{{formatTime(time)}}</span>
                </div>
                <div class="vjs-time-control vjs-time-divider">
                    <div><span>/</span></div>
                </div>
                <div class="vjs-duration vjs-time-control vjs-control">
                    <span class="vjs-duration-display" aria-live="off">{{formatTime(duration)}}</span>
                </div>
                <div class="vjs-volume-panel vjs-control vjs-volume-panel-horizontal">
                    <button class="vjs-mute-control vjs-control vjs-button vjs-vol-3" type="button" title="Mute" aria-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder"></span>
                    </button>
                    <div class="vjs-volume-control vjs-control vjs-volume-horizontal">
                        <el-slider class="w" v-model="volume" @change="vSetVolume"></el-slider>
                    </div>
                </div>
                <div class="lh-3em lrc-switch-box">
                    <span class="dis-i">字幕</span>
                    <el-switch
                            v-model="lrcVisible"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :width="25"
                    ></el-switch>
                </div>
                <speed @speedchanged="vSetSpeed" class="vjs-playback-rate vjs-control lh-3em"></speed>
                <button class="vjs-fullscreen-control vjs-control vjs-button" type="button" title="Fullscreen" aria-disabled="false">
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
    </div>
</template>