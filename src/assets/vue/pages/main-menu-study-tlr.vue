<script>
    import ComponentVideo from "../components/top-bar-study-custom/video-orig.vue";
    import ComponentAudio from "../components/top-bar-study-custom/audio-orig.vue";
    import ComponentWork from "../components/top-bar-study-custom/homework.vue";
    import ComponentPdf from "../components/top-bar-study-custom/pdf.vue";

    import Feedback from "../components/part/feedback.vue";



    import './../../css/video-js.css';
    import './../../css/video-js-kgc.less';

    export default {
        data: function () {
            return {
                courseTitle:null,
                chapterList:null,
                resourceList:null,
                activeChapter:this.$route.params.activeChapter,
                activeSection:this.$route.params.activeSection,
                activeSectionList:null,
                activeChapterObj:null,
                activeSectionObj:null,
                feedbackVisible:false,//是否显示反馈

                menuExpand:true,//目录展开

                hideUITimeout:null,//隐藏播放界面定时
            }
        },
        created(){
            this.resetData();
        },
        mounted () {
            //本页面 子页面鼠标移动，显示控制界面
            window.addEventListener("mousemove",this.setUIVisible);
            window.addEventListener("pdfPageMousemove",this.setUIVisible);
            //全屏处理
            if (this.screenfull.enabled) {
                this.screenfull.on('change', this.setFullScreen);
            }
        },
        beforeDestroy(){
            window.removeEventListener("mousemove",this.setUIVisible);
            window.removeEventListener("pdfPageMousemove",this.setUIVisible);
            //全屏处理
            if (this.screenfull.enabled) {
                this.screenfull.off('change', this.setFullScreen);
            }
        },
        watch:{
            '$store.state.chapterList':'resetData',
            '$route':'resetData',
        },
        computed: {
            UIVisible(){
                return this.$store.state.UIVisible;
            },
            isFullScreen(){
                return this.$store.state.isFullScreen;
            },
            nextSectionObj(){
                var chapterList = this.$store.state.chapterList,
                        activeChapter = Number(this.activeChapter),
                        activeSection = Number(this.activeSection),
                        nextChapter = null,
                        nextSection = null;
                if(activeChapter > chapterList.length-1){
                    //章下标越界
                    return null
                }else{
                    var secrionList = chapterList[activeChapter].sectionList
                    if(activeSection < secrionList.length-1){
                        //不是本章最后一节
                        nextChapter = activeChapter;
                        nextSection = activeSection+1;
                    }else if(activeSection === secrionList.length-1){
                        //是本章最后一节
                        if(activeChapter < chapterList.length-1){
                            //存在下一章
                            nextChapter = activeChapter+1;
                            nextSection = 0;
                        }else{
                            return null
                        }
                    }else{
                        //节下标越界
                        return null;
                    }
                }
                var nextSectionObj = chapterList[nextChapter].sectionList[nextSection];
                return {
                    nextChapter,
                    nextSection,
                    nextSectionObj,
                    title:nextSectionObj.title,
                    link:"/main-menu-study-tlr/"+nextChapter+"/"+nextSection,
                }
            },
            prevSectionObj(){
                var chapterList = this.$store.state.chapterList,
                        activeChapter = Number(this.activeChapter),
                        activeSection = Number(this.activeSection),
                        prevChapter = null,
                        prevSection = null;
                if(activeChapter < 0){
                    //章下标越界
                    return null
                }else{

                    if(activeSection > 0){
                        //不是本章第一节
                        prevChapter = activeChapter;
                        prevSection = activeSection-1;
                    }else if(activeSection === 0){
                        //是本章第一节
                        if(activeChapter > 0){
                            //存在上一章
                            prevChapter = activeChapter-1;
                            var prevSectionList = chapterList[prevChapter].sectionList
                            prevSection = prevSectionList.length-1;//取上一章 最末一节
                        }else{
                            return null
                        }
                    }else{
                        //节下标越界
                        return null;
                    }
                }
                var nextSectionObj = chapterList[prevChapter].sectionList[prevSection];
                return {
                    prevChapter,
                    prevSection,
                    nextSectionObj,
                    title:nextSectionObj.title,
                    link:"/main-menu-study-tlr/"+prevChapter+"/"+prevSection,
                }
            },
        },
        methods: {
            //监控页面全屏
            setFullScreen(){
                console.log("全屏状态"+this.screenfull.isFullscreen)
                this.$store.commit("SET_FULL_SCREEN",this.screenfull.isFullscreen);
            },
            //控制界面显示，6秒后隐藏
            setUIVisible(){
                this.$store.commit("SET_UI_VISIBLE",true);
                clearTimeout(this.hideUITimeout);
                this.hideUITimeout = setTimeout(()=>{
                    this.$store.commit("SET_UI_VISIBLE",false);
                },6000)
            },
            resetData(){
                if(this.$store.state.chapterList){
                    this.resourceList = this.$store.state.resourceList;
                    this.activeChapter=this.$route.params.activeChapter;
                    this.activeSection=this.$route.params.activeSection;
                    this.chapterList = this.$store.state.chapterList;
                    this.activeChapterObj = this.chapterList[this.activeChapter];
                    this.activeSectionList = this.activeChapterObj.sectionList;
                    this.activeSectionObj = this.activeSectionList[this.activeSection];
                    this.$store.commit("SET_PDF_MODEL","auto");//还原自动同步
                    this.feedbackVisible = false;//隐藏反馈界面
                }
            },
            triggerExpand(){
                this.menuExpand = !this.menuExpand;
            },
            goPrevSection(){
                var prevSectionObj = this.prevSectionObj
                if(prevSectionObj){
                    window.location.hash = prevSectionObj.link
                }
            },
            goNextSection(){
                var nextSectionObj = this.nextSectionObj
                if(this.activeSectionObj.needFeedback){
                    this.feedbackVisible = true;
                }else if(nextSectionObj){
                    window.location.hash = nextSectionObj.link
                }
            },
        },
        components: {
            'component-video': ComponentVideo,
            'component-audio': ComponentAudio,
            'component-work': ComponentWork,
            'component-pdf': ComponentPdf,
            'feedback': Feedback,
        }
    }
</script>
<style>
    .left-menu{transition: width 0.3s;}
    /*消除边框*/
    .left-menu .el-aside{border-right:none;}
    /*目录-资料tab页*/
    .left-menu .el-tabs__item{color:#93999f;}
    .left-menu .el-tabs__item:hover,.el-tabs__item.is-active{color:#13ce66;}
    .left-menu .el-tabs__active-bar{background:#13ce66;}
    .left-menu .el-tabs__nav{margin-left:95px;}
    .left-menu .el-tabs__nav-wrap::after{background:#1e2124;}
    .left-menu .el-tabs__content{height:calc(100% - 60px);}

    /*目录选中颜色*/
    .left-menu .el-menu{border:none;}
    .left-menu .selected-menu-item{color:#fff;}
    .left-menu .selected-menu-item i{color:#fff;}
    /*章目录*/
    .left-menu .el-menu-item, .left-menu .el-submenu__title{height:45px;line-height:45px;}
    .left-menu .el-submenu__title{padding:0 10px;overflow:hidden;}
    .left-menu .el-submenu__title i,.el-menu-item i{color:#93999f;}
    .left-menu .el-submenu [class^="el-icon-"]{font-size:12px;width:18px;}
    .left-menu .el-submenu .el-menu-item{padding:0 10px;}
    .left-menu .el-submenu__icon-arrow{left:12px;right:inherit;top:54%;}
    .left-menu .el-submenu__icon-arrow:before{content:"㊉";font-size:12px;}
    .left-menu .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow:before{content:"㊀";color:#13ce66;}
</style>
<style scoped>
    /*全屏显示样式*/
    .full-screen{
        position: absolute;width: 100%;height: 100%;top: 0;z-index: 2;
    }
    .dark-bg{
        background:#25282c;
    }
    .header-bg{
        background: #1d1f23;
    }
    .title{color:#93999f;}
    /*折叠展开按钮*/
    .menu-btn{width:80px;}
    /*上一节下一节按钮*/
    .section-flow-right-box{bottom:70px;right:20px;position:absolute;z-index:2;width:30px;height:auto;overflow:visible;}
    .section-flow-right-box .prev-section-flow-right-btn,.next-section-flow-right-btn{background:#1d1f23;width:30px;height:63px;line-height:12px;box-sizing:border-box;border-radius:4px;position:absolute;right:0;cursor:pointer;}
    .section-flow-right-box .prev-section-flow-right-btn:hover,.next-section-flow-right-btn:hover{text-shadow:0 0 5px #13ce66;color:#ddd;}
    .prev-section-flow-right-btn{bottom:70px;padding-top:4px;}
    .next-section-flow-right-btn{bottom:0;padding-top:7px;}
</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 dark-bg">

        <feedback v-if="activeSectionObj && activeSectionObj.needFeedback" :visible="feedbackVisible" :nextSectionObj="nextSectionObj" :activeSectionObj="activeSectionObj"></feedback>
        <el-header class="lh60 p0 pr30 bs-b h60 al f16 title header-bg">
            <div @click="triggerExpand" class="cur-p dis-i menu-btn dark-bg left ac">
                <span style="transform:rotate(-90deg);" class="pr5 f20 dis-i">ⅲ</span>目录
            </div>
            <span class="ml15">{{$store.state.courseTitle}}　>　{{activeChapterObj?activeChapterObj.title:""}}　>　{{activeSectionObj?activeSectionObj.title:""}}</span>
        </el-header>
        <el-container class="h60-besides">
            <el-aside class="h left-menu" :width="menuExpand?'300px':'0'">
                <el-tabs  class="h" >
                    <el-tab-pane class="h":stretch="true">
                        <span slot="label" class="ac":stretch="true">课程</span>
                        <el-menu class="h" :unique-opened="true" :default-active="activeChapter+'-'+activeSection" background-color="#25282c" active-text-color="#17ad5b" text-color="#93999f">
                            <el-scrollbar class="h">
                                <el-submenu  v-for="(chapter,cIndex) in chapterList" :index="String(cIndex)">
                                    <template slot="title">
                                        <div :class="((activeChapter==cIndex)?'selected-menu-item':'')">
                                            <el-row :title="chapter.title">
                                                <el-col :span="2" class="ac">&nbsp;</el-col>
                                                <el-col :span="19" class="al ellipsis">
                                                    {{chapter.title}}
                                                </el-col>
                                                <el-col :span="3" class="ar">
                                                    <i v-if="chapter.progress=='100%'" style="color:#15bc60;" class="el-icon-check"></i>
                                                    <i v-else>{{chapter.progress}}</i>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </template>
                                    <router-link class="dis-b" :to="'/main-menu-study-tlr/'+cIndex+'/'+sIndex" v-for="(section,sIndex) in chapter.sectionList">
                                        <el-menu-item  :index="cIndex+'-'+sIndex" >
                                            <el-row :title="section.title">
                                                <el-col :span="3" class="al">
                                                    <div class="icon" :class="{
                                                        'selected':sIndex==activeSection && cIndex==activeChapter,
                                                        'icon-video':section.type=='video',
                                                        'icon-audio':section.type=='audio',
                                                        'icon-pdf':section.type=='pdf' || section.type=='text',
                                                        'icon-work':section.type=='work',
                                                    }"></div>
                                                </el-col>
                                                <el-col :span="18" class="al ellipsis">{{section.title}}</el-col>
                                                <el-col :span="3" class="ar">
                                                    <i v-if="section.progress=='100%'" style="color:#15bc60;" class="el-icon-check"></i>
                                                    <span v-else class="dis-b f24" style="padding-right:6px;">○</span>
                                                </el-col>
                                            </el-row>
                                        </el-menu-item>
                                    </router-link>
                                </el-submenu>
                            </el-scrollbar>
                        </el-menu>
                    </el-tab-pane>
                    <el-tab-pane class="h" v-if="resourceList && ((resourceList.list && resourceList.list.length) || resourceList.collection)">
                        <span slot="label"class="ac">资料</span>
                        <el-menu background-color="#25282c" active-text-color="#fff" text-color="#93999f">
                            <a class="gray" :href="res.url" target="_blank" v-for="(res,index) in resourceList.list">
                                <el-menu-item class="" :index="'index'+index">
                                    <span class="left">{{index+1}}、{{res.name}}</span>
                                    <span class="right"><i class="el-icon-download mr10"></i></span>
                                </el-menu-item>
                            </a>
                            <a class="gray" :href="resourceList.collection" target="_blank">
                                <el-menu-item index="dabaoxiazai" class="mt20" style="border-top:1px solid #1e1e1e;">
                                    <i class="el-icon-download mr10"></i><span>打包下载</span>
                                </el-menu-item>
                            </a>
                        </el-menu>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-container v-if="activeSectionList" :class="{'pos-rel':true,'hide-overflow':true,'full-screen':isFullScreen}">
                <div class="pos-abs section-flow-right-box">
                    <a v-show="UIVisible" class="prev-section-flow-right-btn white ac dis-i" @click="goPrevSection" v-if="prevSectionObj">
                        <i class="el-icon-arrow-up f16"></i><br />上<br />一<br />节
                    </a>
                    <a v-show="UIVisible" class="next-section-flow-right-btn white ac dis-i mt10" @click="goNextSection" v-if="nextSectionObj">
                        下<br />一<br />节<br /><i class="el-icon-arrow-down f16"></i>
                    </a>
                </div>
                <div class="w h">
                    <component-video v-if="activeSectionObj && activeSectionObj.type==='video'"  :activeSectionObj="activeSectionObj"></component-video>
                    <component-audio v-else-if="activeSectionObj && activeSectionObj.type==='audio'"  :activeSectionObj="activeSectionObj"></component-audio>
                    <component-work v-else-if="activeSectionObj && activeSectionObj.type==='work'"  :activeSectionObj="activeSectionObj"></component-work>
                    <component-pdf v-else-if="activeSectionObj && activeSectionObj.type==='pdf'"  :activeSectionObj="activeSectionObj"></component-pdf>
                </div>
            </el-container>
        </el-container>
    </el-container>
</template>