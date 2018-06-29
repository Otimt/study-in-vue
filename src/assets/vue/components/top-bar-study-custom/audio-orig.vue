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
                pdfPage:1,//pdf当前页
                pdfTotal:0,//pdf总页数，不为0，表示pdf已初始化完毕

                pdfInterval:null,
                autoSync:true,//自动同步


            };
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            },
            mp3(){return this.activeSectionObj.mp3},
            lrc(){return this.activeSectionObj.lrc},
        },
        mounted () {
            localStorage.setItem("pdfjs.history","");//清除 pdf 播放记录，自动回到第一页
        },
        beforeDestroy(){
        },
        methods: {
            setCurrentTime(time){
                this.time = time;
                this.turnPdfByTime()
            },
            switchSync(){
                this.autoSync = !this.autoSync;
            },
            turnPdfByTime(){
                var time2pdf = this.activeSectionObj.time2pdf,
                    pdfCurrent = this.getPdfPage();
                for(var i=0,il=time2pdf.length;i<il;i++){
                    if((i+1)==time2pdf.length || (this.time >= time2pdf[i]  && this.time < time2pdf[i+1])){
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
                    <!--<speed @speedchanged="setSpeed"></speed>-->
                <!--</span>-->
            <!--</div>-->
        <!--</div>-->

        <div class="course-pdf w h">
            <iframe @load="setPdfFrameDoc" id="pdfFrame" :src="'../iframe/pdf/web/viewer.html?pdf='+activeSectionObj.pdf" class="w h" frameborder="0"></iframe>
        </div>
        <av-controller :activeSectionObj="activeSectionObj" @timeupdate="setCurrentTime" class="pos-abs b0 l0 w h"></av-controller>
        <pdf-controller></pdf-controller>
    </div>
</template>
