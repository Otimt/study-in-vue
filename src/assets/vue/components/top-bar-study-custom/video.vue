<script>
    import ComponentLrc from  "../part/lrc.vue";
    import ComponentSpeed from  "../part/play-speed.vue";

    import { videojs,videoPlayer } from 'vue-video-player';

    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc,
            'speed' : ComponentSpeed,
            'video-player':videoPlayer
        },
        data(){
            return {
                lrcVisible:true,
                time:0,
            }
        },

        mounted () {
        },
        beforeDestroy(){
        },
        methods: {

            setCurrentTime(e){
                var video = e.player_;
                this.time = video.currentTime();
            },
            setSpeed(){
                var selectedSpeed = this.$store.state.selectedSpeed,
                    speedList=this.$store.state.speedList,
                    speed = Number(speedList[selectedSpeed]);
                var myVid=document.getElementById("course-video");
                myVid.playbackRate=Number(speed);
                console.log("设置视频速率"+speed)
            },
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            },
            playerOptions(){
                return {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
//                    aspectRatio: 'auto', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",
                        src: this.activeSectionObj.mp4 //你的m3u8地址（必填）
                    }],
//                    poster: "./../../../data/ty.jpg", //你的封面地址
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true,  //全屏按钮
                    }
                }
            },
            lrc(){return this.activeSectionObj.lrc},

        }
    }
</script>
<style>
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
<style>
    /*覆盖*/
    .video-js{height:100%;}
</style>
<template>
    <div class="w h">
        <!--<div class="right-tool-bar">-->
            <!--<div class="lrc-ctrl left" v-if="activeSectionObj.lrc">-->
                <!--<template>-->
                    <!--<el-switch-->
                            <!--class="ml5"-->
                            <!--v-model="lrcVisible"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--:width="25"-->
                    <!--&gt;</el-switch>-->
                    <!--<span class="mr5 white">字幕</span>-->
                <!--</template>-->
            <!--</div>-->
            <!--<speed @speedchanged="setSpeed"></speed>-->
        <!--</div>-->
        <div class="course-video w h hide-overflow">
            <video-player class="video-player vjs-custom-skin h "
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          @timeupdate="setCurrentTime($event)"
            >
            </video-player>
            <lrc v-if="lrc" v-show="lrcVisible" :time="time" :lrc="lrc" style="bottom:60px;"></lrc>
        </div>
    </div>
</template>