<script>
    import ComponentLrc from  "../part/lrc.vue";
//    import ComponentSpeed from  "../part/play-speed.vue";


    export default {
        props: ['activeSectionObj'],
        components: {
            'lrc': ComponentLrc,
//            'speed' : ComponentSpeed,
        },
        data(){
            return {
                //固定参数===================================================
                pdfFrameWin:null,
                pdfFrameDoc:null,
                mp3Dom:null,
                pdfPage:1,//pdf当前页
                pdfTotal:0,//pdf总页数，不为0，表示pdf已初始化完毕

                pdfInterval:null,
                autoSync:true,//自动同步
                lrcVisible:true,

                time:0,

            };
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
                        type: "audio/mp3",
                        src: this.activeSectionObj.mp3 //你的m3u8地址（必填）
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
        },
        mounted () {
            localStorage.setItem("pdfjs.history","");//清除 pdf 播放记录，自动回到第一页
//            this.mp3Dom = document.getElementById("course-audio");
//            this.startSync();
//            this.mp3Dom.addEventListener("loadstart", this.setSpeed)
        },
        beforeDestroy(){
//            this.stopSync();
//            document.removeEventListener("pageChanged",this.pageChangedHandle);
//            this.mp3Dom.removeEventListener("loadstart", this.setSpeed)
        },
        methods: {
            setCurrentTime(e){
                var video = e.player_;
                this.time = video.currentTime();
            },
            switchSync(){
                this.autoSync = !this.autoSync;
            },
            //开始同步
            startSync(){
                this.pdfInterval = setInterval(function(){
                    if(this.pdfTotal == 0){
                        this.pdfTotal = this.getPdfTotal();
                        console.log("正在加载pdf总数");
                        if(this.pdfTotal != 0){
                            console.log("pdf总数首次加载出来"+this.pdfTotal);
                        }
                    }else if(this.autoSync){
                        var time2pdf = this.activeSectionObj.time2pdf,
                            pdfCurrent = this.getPdfPage();
                        for(var i=0,il=time2pdf.length;i<il;i++){
                            if((i+1)==time2pdf.length || (this.mp3Dom.currentTime >= time2pdf[i]  && this.mp3Dom.currentTime < time2pdf[i+1])){
                                let page = i+1;
                                console.log("去第"+page+"页");
                                if(pdfCurrent !== page){
                                    console.log("真去第"+page+"页");
                                    this.pdfGoto(page);
                                }
                                break;
                            }
                        }
                    }
                }.bind(this),500)
            },
            //停止同步
            stopSync(){
                clearInterval(this.pdfInterval);
            },
            //pdf.js API
            setPdfFrameDoc(){
                this.pdfFrameWin = document.getElementById("pdfFrame").contentWindow;
                this.pdfFrameDoc = this.pdfFrameWin.document;
                this.pdfTotal = this.getPdfTotal();
                this.pdfPage = this.getPdfPage();
                document.addEventListener("pageChanged",this.pageChangedHandle)
            },
            //pdf目录点击了，通知本组件切换pdf页数
            pageChangedHandle(){
                this.pdfPage = this.getPdfPage();
            },
            getPdfTotal(){
                let numPagesDom = this.pdfFrameWin && this.pdfFrameWin.PDFViewerApplication;
                if(!numPagesDom){
                    return 0;
                }else{
                    return this.pdfFrameWin.PDFViewerApplication.pagesCount;
                }
            },
            getPdfPage(){
                return this.pdfFrameWin.PDFViewerApplication.page;
            },
            pdfGoto(num){
                this.pdfPage = num;
                this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch('pagenumberchanged', {
                    source: self,
                    value: num
                });
            },
            pdfPrev(){
                if(this.pdfPage > 1) {
                    this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch("previouspage")
                    this.pdfPage--;
                }
            },
            pdfNext(){
                if(this.pdfPage < this.pdfTotal){
                    this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch("nextpage")
                    this.pdfPage++;
                }
            },
            pdfSidebarToggle(){
                this.pdfFrameWin.PDFViewerApplication.pdfSidebar.toggle();
            },

//            //音频控制
//            setSpeed(){
//                var selectedSpeed = this.$store.state.selectedSpeed,
//                    speedList=this.$store.state.speedList,
//                    speed = Number(speedList[selectedSpeed]);
//                this.mp3Dom.playbackRate=speed;
//                console.log("设置音频速率"+speed)
//                console.log("设置的音频"+this.mp3Dom)
//                console.log("设置的音频速率"+this.mp3Dom.playbackRate)
//
//            },
            jumpCurPage(){
                this.mp3Dom.currentTime = this.activeSectionObj.time2pdf[this.pdfPage-1]
            },
        }
    }
</script>
<style>
    .el-scrollbar__view{
        height:calc(100% - 40px);
    }
    .audio-pdf-h{height:calc(100% - 101px);}
    .course-pdf{
        position:relative;
        background:#000;
    }
    .ctrl-box{
        height:60px;
         line-height:60px;
    }
    .ctrl-box .el-switch,.ctrl-box .el-switch__core{
        height:14px;
    }
    .ctrl-box .el-switch__core:after{
        width:10px;height:10px;
    }
    .ctrl-box .el-switch.is-checked .el-switch__core::after{
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
            <!--<div class="ctrl-box w white al">-->
                <!--<span v-if="!pdfTotal">pdf加载中...</span>-->
                <!--<span v-if="pdfTotal>0" class="ml5">-->
                    <!--<span class="mr5 ml10">{{pdfPage}}/{{pdfTotal}}</span>-->
                    <!--<template v-if="activeSectionObj.lrc">-->
                    <!--<el-switch-->
                            <!--v-model="lrcVisible"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--:width="25"-->
                    <!--&gt;</el-switch>-->
                    <!--<span class="mr5">字幕</span>-->
                    <!--</template>-->
                    <!--<el-switch-->
                            <!--v-model="autoSync"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--:width="25"-->
                    <!--&gt;</el-switch>-->
                    <!--<span v-if="autoSync">pdf自动同步</span>-->
                    <!--<span v-else="!autoSync">pdf手动同步</span>-->
                    <!--<span v-if="pdfTotal>0 && !autoSync">-->
                        <!--<span @click="pdfPrev" :class="'cur-p el-icon-d-arrow-left '+ (pdfPage<=1?'gray':'')"></span>-->
                        <!--<span @click="jumpCurPage" class="cur-p el-icon-caret-right"></span>-->
                        <!--<span @click="pdfNext" :class="'cur-p el-icon-d-arrow-right '+(pdfPage==pdfTotal?'gray':'')"></span>-->
                        <!--<span @click="pdfSidebarToggle" class="cur-p">大纲 </span>-->
                    <!--</span>-->
                    <!--&lt;!&ndash;<speed @speedchanged="setSpeed"></speed>&ndash;&gt;-->
                <!--</span>-->
            <!--</div>-->
        <!--</div>-->

        <div class="course-pdf w h">
            <iframe @load="setPdfFrameDoc" id="pdfFrame" :src="'../iframe/pdf/web/viewer.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
            <lrc v-if="lrc" v-show="lrcVisible" :time="time" :lrc="lrc" style="bottom:60px;"></lrc>
        </div>
        <!--<audio id="course-audio" :src="activeSectionObj.mp3" class="w" controls></audio>-->
        <!--h60-->
        <video-player class="audio-player vjs-custom-skin w h pos-abs b0"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      @timeupdate="setCurrentTime($event)"
        >
        </video-player>
    </div>
</template>
