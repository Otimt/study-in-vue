<script>
    import ComponentVideo from "../components/top-bar-study/top-bar-video.vue";
    import ComponentAudio from "../components/top-bar-study/top-bar-audio.vue";
    import ComponentWork from "../components/top-bar-study/top-bar-homework.vue";
    import ComponentPdf from "../components/top-bar-study/top-bar-pdf.vue";


    export default {
        data: function () {
            return {
                courseTitle:null,
                chapterList:null,
                resourceList:null,
//                index:this.$route.params.activeChapter+"-"+this.$route.params.activeSection,
                activeChapter:this.$route.params.activeChapter,
                activeSection:this.$route.params.activeSection,
                activeSectionList:null,
                activeSectionObj:null
            }
        },
        created(){
            this.resetData();
        },
        watch:{
            '$store.state.chapterList':'resetData',
            '$route':'resetData',
        },
        methods: {
            resetData(){
                if(this.$store.state.chapterList){
                    this.resourceList = this.$store.state.resourceList;
                    this.activeChapter=this.$route.params.activeChapter;
                    this.activeSection=this.$route.params.activeSection;
//                    this.index=this.activeChapter+"-"+this.activeSection;
                    this.chapterList = this.$store.state.chapterList;
                    this.activeChapterObj = this.chapterList[this.activeChapter];
                    this.activeSectionList = this.activeChapterObj.sectionList;
                    this.activeSectionObj = this.activeSectionList[this.activeSection];
                }
                console.log(this.activeSectionList)
                console.log(this.activeSectionObj)
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
.dark-bg{
    background:#25282c;
}
/*消除边框*/
.el-aside{
    border-right:none;
}
/*目录-资料tab页*/
.el-tabs__item{color:#999;}
.el-tabs__item:hover,.el-tabs__item.is-active{color:#13ce66;}
.el-tabs__active-bar{background:#13ce66;}
.el-tabs__nav{margin-left:20px;}
.el-tabs__nav-wrap::after{background:#1e2124;}
.el-tabs__content{height:calc(100% - 60px);}
/*目录选中颜色*/
.el-menu{border:none;}
.el-menu-item{color:#999;}
.selected-menu-item{color:#fff;}
.selected-menu-item i{color:#fff;}

</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 dark-bg">
        <el-aside>
            <div class="lh60 pl20 pr30 bs-b black h60">
                <div class="al f16 gray">{{$store.state.courseTitle}}</div>
                <!--<div class="al f12">课程大纲</div>-->
            </div>
            <el-tabs  class="h60-besides">
                <el-tab-pane class="h">
                    <span slot="label">课程</span>
                    <el-menu class="h" :unique-opened="true" :default-active="activeChapter+'-'+activeSection" background-color="#25282c" active-text-color="#fff" text-color="#999">
                        <el-scrollbar class="h">
                            <el-submenu  v-for="(chapter,cIndex) in chapterList" :index="String(cIndex)">
                                <template slot="title">
                                    <div :class="((activeChapter==cIndex)?'selected-menu-item':'')">
                                        <el-row :title="chapter.title">
                                            <el-col :span="19" class="al">
                                                {{chapter.title}}
                                            </el-col>
                                            <el-col :span="3" class="ac">
                                                <i v-if="chapter.progress=='100%'" style="color:#15bc60;" class="el-icon-check"></i>
                                                <i v-else class="dis-b">{{chapter.progress}}</i>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </template>
                                <router-link :to="'/main-menu-study/'+cIndex+'/'+sIndex" v-for="(section,sIndex) in chapter.sectionList">
                                    <el-menu-item  :index="cIndex+'-'+sIndex" >
                                        <el-row :title="section.title">
                                            <el-col :span="3" class="ac">
                                                <i v-if="section.progress=='100%'" style="color:#15bc60;" class="el-icon-check"></i>
                                                <i v-else class="dis-b f24">○</i>
                                            </el-col>
                                            <el-col :span="16" class="al ellipsis">{{section.title}}</el-col>
                                            <el-col :span="5" class="ac">{{section.progress}}</el-col>
                                        </el-row>
                                    </el-menu-item>
                                </router-link>
                            </el-submenu>
                        </el-scrollbar>
                    </el-menu>
                </el-tab-pane>
                <el-tab-pane class="h" v-if="resourceList && resourceList.length">
                    <span slot="label" v-if="resourceList && resourceList.length">资料</span>
                    <el-menu background-color="#25282c" active-text-color="#fff" text-color="#999">
                        <el-menu-item class="" v-for="(res,index) in resourceList">
                            <a class="gray" :href="res.url" target="_blank"><i class="el-icon-download mr10"></i><span>{{res.name}}</span></a>
                        </el-menu-item>
                    </el-menu>
                </el-tab-pane>
            </el-tabs>
        </el-aside>
        <el-container v-if="activeSectionList" class="pos-rel hide-overflow">
            <router-link class="prev-section-btn white" :to="'/main-menu-study/'+activeChapter+'/'+(Number(activeSection)-1)" v-if="activeSection>0">
                <i class="el-icon-arrow-left f16"></i><br />
                <span class="f12">上一节</span>
            </router-link>
            <router-link class="next-section-btn white" :to="'/main-menu-study/'+activeChapter+'/'+(Number(activeSection)+1)" v-if="activeSectionList && activeSection<activeSectionList.length-1">
                <i class="el-icon-arrow-right f16"></i><br />
                <span class="f12">下一节</span>
            </router-link>
            <div class="w h">
                <component-video v-if="activeSectionObj && activeSectionObj.type==='video'"  :activeSectionObj="activeSectionObj"></component-video>
                <component-audio v-else-if="activeSectionObj && activeSectionObj.type==='audio'"  :activeSectionObj="activeSectionObj"></component-audio>
                <component-work v-else-if="activeSectionObj && activeSectionObj.type==='work'"  :activeSectionObj="activeSectionObj"></component-work>
                <component-pdf v-else-if="activeSectionObj && activeSectionObj.type==='pdf'"  :activeSectionObj="activeSectionObj"></component-pdf>
            </div>

        </el-container>
    </el-container>
</template>