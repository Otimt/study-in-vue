<script>
    import ComponentVideo from "../components/top-bar-study-custom/video-orig.vue";
    import ComponentAudio from "../components/top-bar-study-custom/audio-orig.vue";
    import ComponentWork from "../components/top-bar-study-custom/homework.vue";
    import ComponentPdf from "../components/top-bar-study-custom/pdf.vue";



    import 'video.js/dist/video-js.css';
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

                menuExpand:true,//目录展开

                hideUITimeout:null,
            }
        },
        created(){
            this.resetData();
        },
        mounted () {
            //本页面 子页面鼠标移动，显示控制界面
            window.addEventListener("mousemove",this.setUIVisible);
            window.addEventListener("pdfPageMousemove",this.setUIVisible);
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
            }
        },
        methods: {
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
                }
            },
            triggerExpand(){
                this.menuExpand = !this.menuExpand;
            }
        },
        components: {
            'component-video': ComponentVideo,
            'component-audio': ComponentAudio,
            'component-work': ComponentWork,
            'component-pdf': ComponentPdf,
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
    .prev-section-flow-right-btn,.next-section-flow-right-btn{background:#1d1f23;width:60px;height:42px;position:absolute;z-index:2;text-align:center;line-height:12px;box-sizing:border-box;top:50%;right:20px;border-radius:4px;}
    .prev-section-flow-right-btn:hover,.next-section-flow-right-btn:hover{text-shadow:0 0 5px #13ce66;color:#ddd;}
    .prev-section-flow-right-btn{margin-top:-52px;padding-top:4px;}
    .next-section-flow-right-btn{margin-top:10px;padding-top:10px;}
</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 dark-bg">
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
                                                <el-col :span="3" class="ac">
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
                                                <el-col :span="3" class="al">
                                                    <i v-if="section.progress=='100%'" style="color:#15bc60;" class="el-icon-check"></i>
                                                    <span v-else class="dis-b f24">○</span>
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
                <router-link v-show="UIVisible" class="prev-section-flow-right-btn white ac" :to="'/main-menu-study-tlr/'+activeChapter+'/'+(Number(activeSection)-1)" v-if="activeSection>0">
                    <i class="el-icon-arrow-up f16"></i><br />
                    <span class="f12">上一节</span>
                </router-link>
                <router-link v-show="UIVisible" class="next-section-flow-right-btn white ac" :to="'/main-menu-study-tlr/'+activeChapter+'/'+(Number(activeSection)+1)" v-if="activeSectionList && activeSection<activeSectionList.length-1">
                    <span class="f12">下一节</span><br />
                    <i class="el-icon-arrow-down f16"></i>
                </router-link>
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