<script>
    import ComponentText from "./../components/study/intro.vue";
    import ComponentVideo from "./../components/study/video.vue";
    import ComponentAudio from "./../components/study/audio.vue";
    import ComponentWork from "./../components/study/homework.vue";
    import ComponentPdf from "./../components/study/pdf.vue";

    export default {
        data: function () {
            return {
                courseTitle:null,
                chapterList:null,
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
        }
    }
</script>
<style>
.selected-menu-item{color:#409eff;}
.selected-menu-item i{color:#409eff;}
</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 bg-white">
        <el-aside>
            <div class="lh60 pl20 pr30 bs-b black b-b-gray b-r-gray h60">
                <div class="al f16">{{$store.state.courseTitle}}</div>
                <div class="al f12">课程大纲</div>
            </div>
            <el-menu unique-opened="true" :default-active="activeChapter+'-'+activeSection" class="h60-besides">
                <el-scrollbar class="h">
                    <el-submenu  v-for="(chapter,cIndex) in chapterList" :index="String(cIndex)">
                        <template slot="title">
                        <div :class="((activeChapter==cIndex)?'selected-menu-item':'')">
                            <i class="el-icon-location"></i>
                            <span>{{chapter.title}}</span>
                        </div>
                        </template>
                        <router-link :to="'/main-menu-study/'+cIndex+'/'+sIndex" v-for="(section,sIndex) in chapter.sectionList">
                            <el-menu-item  :index="cIndex+'-'+sIndex">{{section.title}}</el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-scrollbar>
            </el-menu>
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