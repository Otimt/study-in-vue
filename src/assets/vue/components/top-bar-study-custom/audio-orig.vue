<script>
    import avController from  "../part/av-controller.vue";


    export default {
        props: ['activeSectionObj'],
        components: {
            'av-controller': avController,
        },
        data(){
            return {
                //固定参数===================================================
                pdfFrameWin:null,
                pdfFrameDoc:null,
//                pdfPage:1,//pdf当前页
//                pdfTotal:0,//pdf总页数，不为0，表示pdf已初始化完毕



            };
        },
        computed: {
            autoSync(){
                var autoSyncVal = this.$store.state.selectedPDFModel=='auto';
                if(autoSyncVal){
                    this.pdfSidebarClose()
                }else{
                    this.pdfSidebarOpen()
                }
                return autoSyncVal
            },
        },
        mounted () {
            localStorage.setItem("pdfjs.history","");//清除 pdf 播放记录，自动回到第一页
        },
        beforeDestroy(){
        },
        methods: {
            setCurrentTime(time){
                this.autoSync && this.turnPdfByTime(time)
            },
            turnPdfByTime(time){
                var time2pdf = this.activeSectionObj.time2pdf,
                    pdfCurrent = this.getPdfPage();
                for(var i=0,il=time2pdf.length;i<il;i++){
                    if((i+1)==time2pdf.length || (time >= time2pdf[i]  && time < time2pdf[i+1])){
                        let page = i+1;
                        console.log("去第"+page+"页");
                        if(pdfCurrent !== page){
                            console.log("真去第"+page+"页");
                            this.pdfGoto(page);
                        }
                        break;
                    }
                }
            },
            //pdf.js API
            setPdfFrameDoc(){
                console.log("初始化1")
                this.pdfFrameWin = document.getElementById("pdfFrame").contentWindow;
                console.log("初始化2")
                this.pdfFrameDoc = this.pdfFrameWin.document;
                console.log("初始化3")
//                this.pdfTotal = this.getPdfTotal();
                console.log("初始化4")
//                this.pdfPage = this.getPdfPage();
                console.log("初始化5")
//                console.log(this.pdfTotal)
//                console.log(this.pdfPage)
                console.log("初始化6")
                document.addEventListener("pageChanged",this.pageChangedHandle)
            },
            //pdf目录点击了，通知本组件切换pdf页数
            pageChangedHandle(){
                this.pdfPage = this.getPdfPage();
                var time2pdf = this.activeSectionObj.time2pdf,
                    time = time2pdf[this.pdfPage-1];
                console.log(time);
                console.log(this.$refs.video);
                this.$refs.video.vSeek(time);
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
                if(this.pdfFrameWin && this.pdfFrameWin.PDFViewerApplication && this.pdfFrameWin.PDFViewerApplication.eventBus) {
                    this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch("nextpage")
                }
            },
            pdfSidebarToggle(){
                if(this.pdfFrameWin && this.pdfFrameWin.PDFViewerApplication && this.pdfFrameWin.PDFViewerApplication.pdfSidebar){
                    this.pdfFrameWin.PDFViewerApplication.pdfSidebar.toggle();
                }
            },
            pdfSidebarOpen(){
                if(this.pdfFrameWin && this.pdfFrameWin.PDFViewerApplication && this.pdfFrameWin.PDFViewerApplication.pdfSidebar){
                    this.pdfFrameWin.PDFViewerApplication.pdfSidebar.open();
                }
            },
            pdfSidebarClose(){
                if(this.pdfFrameWin && this.pdfFrameWin.PDFViewerApplication && this.pdfFrameWin.PDFViewerApplication.pdfSidebar){
                    this.pdfFrameWin.PDFViewerApplication.pdfSidebar.close();
                }
            }

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
                    <!--</template>-->
                    <!--<speed @speedchanged="setSpeed"></speed>-->
                <!--</span>-->
            <!--</div>-->
        <!--</div>-->

        <div class="course-pdf w h">
            <iframe @load="setPdfFrameDoc" id="pdfFrame" :src="'../iframe/pdf/web/viewer.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
        </div>
        <av-controller ref="video" :activeSectionObj="activeSectionObj" @timeupdate="setCurrentTime" :class="'pos-abs b0 l0 w '+ (autoSync?'h':'h60')"></av-controller>
    </div>
</template>
