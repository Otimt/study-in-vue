<script>
    import ComponentText from "./../components/study/intro.vue";
    import ComponentVideo from "./../components/study/video.vue";
    import ComponentAudio from "./../components/study/audio.vue";
    import ComponentWork from "./../components/study/homework.vue";
    import ComponentPdf from "./../components/study/pdf.vue";
    import ComponentResource from "./../components/study/resource.vue";


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
            'component-text': ComponentText,
            'component-video': ComponentVideo,
            'component-audio': ComponentAudio,
            'component-work': ComponentWork,
            'component-pdf': ComponentPdf,
            'component-resource': ComponentResource,
        }
    }
</script>
<style>

/*消除边框*/
/*.el-tabs--border-card{border:none;}*/
.el-tabs__content{height:calc(100% - 60px);}
.el-menu{border-right:none;}
/*目录选中颜色*/
.selected-menu-item{color:#409eff;}
.selected-menu-item i{color:#409eff;}
</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 bg-white">
        <el-aside>
            <div class="lh60 pl20 pr30 bs-b black b-b-gray b-r-gray h60">
                <div class="al f16">{{$store.state.courseTitle}}</div>
                <!--<div class="al f12">课程大纲</div>-->
            </div>
            <el-tabs type="card"  class="h60-besides b-r-gray">
                <el-tab-pane class="h">
                    <span slot="label"><i class="el-icon-date"></i> 目录</span>
                    <el-menu class="h" :unique-opened="true" :default-active="activeChapter+'-'+activeSection">
                        <el-scrollbar class="h">
                            <el-submenu  v-for="(chapter,cIndex) in chapterList" :index="String(cIndex)">
                                <template slot="title">
                                    <div :class="((activeChapter==cIndex)?'selected-menu-item':'')">
                                        <i class="el-icon-location"></i>
                                        <span>{{chapter.title}}</span>
                                    </div>
                                </template>
                                <router-link :to="'/main-menu-study/'+cIndex+'/'+sIndex" v-for="(section,sIndex) in chapter.sectionList">
                                    <el-menu-item  :index="cIndex+'-'+sIndex">
                                        <el-row :title="section.title">
                                            <el-col :span="3" class="ac"><i class="el-icon-menu"></i></el-col>
                                            <el-col :span="16" class="al ellipsis">{{section.title}}</el-col>
                                            <el-col :span="5" class="ac">{{section.progress}}</el-col>
                                        </el-row>
                                    </el-menu-item>
                                </router-link>
                            </el-submenu>
                        </el-scrollbar>
                    </el-menu>
                </el-tab-pane>
                <el-tab-pane class="h" v-if="resourceList">
                    <span slot="label"><i class="el-icon-date"></i> 资料</span>
                    <el-menu>
                        <el-menu-item class="" v-for="(res,index) in resourceList">
                            <a :href="res.url" target="_blank"><i class="el-icon-download mr10"></i><span>{{res.name}}</span></a>
                        </el-menu-item>
                    </el-menu>
                </el-tab-pane>
            </el-tabs>

        </el-aside>
        <el-container v-if="activeSectionList">
            <el-header class="lh60 b-b-gray">
                <div class="left f14">{{activeSectionObj && activeSectionObj.title}}</div>
                <div class="right">进度：{{activeSectionObj && activeSectionObj.progress}}</div>
            </el-header>
            <el-scrollbar class="b-b-gray" style="flex:1">
                <div class="pl20 pr20 pt20 pb20 h">
                    <component-text v-if="activeSectionObj && activeSectionObj.type==='text'" :activeSectionObj="activeSectionObj"></component-text>
                    <component-video v-else-if="activeSectionObj && activeSectionObj.type==='video'"  :activeSectionObj="activeSectionObj"></component-video>
                    <component-audio v-else-if="activeSectionObj && activeSectionObj.type==='audio'"  :activeSectionObj="activeSectionObj"></component-audio>
                    <component-work v-else-if="activeSectionObj && activeSectionObj.type==='work'"  :activeSectionObj="activeSectionObj"></component-work>
                    <component-pdf v-else-if="activeSectionObj && activeSectionObj.type==='pdf'"  :activeSectionObj="activeSectionObj"></component-pdf>
                    <component-resource v-else-if="activeSectionObj && activeSectionObj.type==='resource'"  :activeSectionObj="activeSectionObj"></component-resource>

                </div>
            </el-scrollbar>
            <el-footer class="lh60">
                <el-row>
                    <el-col :span="12" class="al">
                        <router-link :to="'/main-menu-study/'+activeChapter+'/'+(Number(activeSection)-1)">
                            <el-button type="primary" v-if="activeSection>0">上一节</el-button>
                        </router-link>&nbsp;
                    </el-col>
                    <el-col :span="12" class="ar">
                        &nbsp;<router-link :to="'/main-menu-study/'+activeChapter+'/'+(Number(activeSection)+1)">
                        <el-button type="primary" v-if="activeSectionList && activeSection<activeSectionList.length-1">下一节</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </el-container>
</template>