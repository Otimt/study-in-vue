<script>
    export default {
        data(){
            return {
                //固定参数
                playbackSpeedIndex:2,//倍速
                speedList:[0.5,0.75,1,1.5,2],
                pdfInterval:null,
                pdfFrameDoc:null,
                pdfTotal:0,
                mp3:null,

                //动态加载数据
                title:"欢迎来到课工场",
                audioUrl:"../iframe/mp3/adiao.mp3",//视频地址
                time2pdf:[
                    0,30,60,90,120,150,180,210,240,270,300
                ],

            };
        },
        mounted () {
            localStorage.setItem("pdfjs.history","");//清除 pdf 播放记录，自动回到第一页
            this.mp3 = document.getElementById("course-audio");
            this.pdfInterval = setInterval(function(){
                if(this.pdfTotal == 0){
                    this.pdfTotal = this.getPdfTotal();
                    console.log("正在加载pdf总数");
                }else{
                    var time2pdf = this.time2pdf,
                        pdfCurrent = this.getPdfPage();
                    for(var i=0,il=time2pdf.length;i<il;i++){
                        if(this.mp3.currentTime >= time2pdf[i] &&  (i+1)<time2pdf.length && this.mp3.currentTime < time2pdf[i+1]){
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
            }.bind(this),1000)
        },
        beforeDestroy(){
            clearInterval(this.pdfInterval);
        },
        methods: {
            setPdfFrameDoc(){
                this.pdfFrameWin = document.getElementById("pdfFrame").contentWindow;
                this.pdfFrameDoc = this.pdfFrameWin.document;
            },
            getPdfTotal(){
                console.log("this.pdfFrameWin"+this.pdfFrameWin)
                console.log("this.pdfFrameWin.PDFViewerApplication"+this.pdfFrameWin.PDFViewerApplication)
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
                this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch('pagenumberchanged', {
                    source: self,
                    value: num
                });
            },
            pdfPrev(){
                this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch("previouspage")
            },
            pdfNext(){
                this.pdfFrameWin.PDFViewerApplication.eventBus.dispatch("nextpage")
            },
            speedUp(){
                if(this.playbackSpeedIndex<(this.speedList.length-1)){
                    this.playbackSpeedIndex++;
                    var myVid=document.getElementById("course-audio");
                    myVid.playbackRate=this.speedList[this.playbackSpeedIndex];
                }
            },
            speedDown(){
                if(this.playbackSpeedIndex>0){
                    this.playbackSpeedIndex--;
                    var myVid=document.getElementById("course-audio");
                    myVid.playbackRate=this.speedList[this.playbackSpeedIndex];
                }
            },
        }
    }
</script>
<style>
    .w700{width:700px;}
    .course-pdf{
        position:relative;
        width:700px;
        height:360px;
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
        <div>{{title}}</div>
        <div class="course-pdf">
            <iframe @load="setPdfFrameDoc" id="pdfFrame" src="../iframe/pdf/web/viewer.html" class="w h" frameborder="0"></iframe>
            <div class="speed-box white ar pr5"><span @click="speedDown" class="cur-p">«</span> {{speedList[playbackSpeedIndex]}}×倍速 <span @click="speedUp" class="cur-p">»</span></div>
        </div>
        <audio id="course-audio" :src="audioUrl" class="w700" controls></audio>
    </div>
</template>