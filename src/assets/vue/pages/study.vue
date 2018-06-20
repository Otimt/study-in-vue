<script>
    import ComponentText from "./../components/study/intro.vue";
    import ComponentVideo from "./../components/study/video.vue";
    import ComponentAudio from "./../components/study/audio.vue";
    import ComponentWork from "./../components/study/homework.vue";
    import ComponentPdf from "./../components/study/pdf.vue";

    export default {
        data: function () {
            return {
                title:"",
                progress:"",
                sectionList:null,
                activeChapter:this.$route.params.activeChapter,
                activeSection:this.$route.params.activeSection,
                activeSectionObj:{type:""},
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
                    this.activeChapter = this.$route.params.activeChapter;
                    this.activeSection = this.$route.params.activeSection;
                    var activeChapterObj = this.$store.state.chapterList[this.activeChapter];
                    this.title = activeChapterObj.title;
                    this.progress = activeChapterObj.progress;
                    this.sectionList = activeChapterObj.sectionList;
                    this.$store.commit("SET_ACTIVE_CHAPTER",this.activeChapter);
                    this.activeSectionObj = this.sectionList[this.activeSection];
                }
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

</style>
<template>
    <el-container v-loading="!$store.state.chapterList" class="pos-abs l0 r0 t0 b0 bg-white">
        <el-aside>
            <div class="lh60 pl20 pr30 bs-b black b-b-gray b-r-gray h60">
                <router-link class="f18" to="/"><</router-link>
                <span class="al f16">{{title}}</span>
            </div>
            <el-menu :default-active="activeSection.toString()" class="h60-besides">
                <el-scrollbar class="h">
                    <router-link :to="'/study/'+activeChapter+'/'+index" v-for="(section,  index) in sectionList">
                        <el-menu-item class="hideoverflow"  :index="index.toString()">
                            <el-row :title="section.title">
                                <el-col :span="3" class="ac"><i class="el-icon-menu"></i></el-col>
                                <el-col :span="16" class="al ellipsis">{{section.title}}</el-col>
                                <el-col :span="5" class="ac">{{section.progress}}</el-col>
                            </el-row>
                        </el-menu-item>
                    </router-link>
                </el-scrollbar>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="lh60 b-b-gray">
                <div class="left f14">{{sectionList && sectionList[activeSection].title}}</div>
                <div class="right">进度：{{sectionList && sectionList[activeSection].progress}}</div>
            </el-header>
            <el-scrollbar class="b-b-gray" style="flex:1">
                <div class="pl20 pr20 pt20 pb20 h">
                    <component-text v-if="activeSectionObj.type==='text'" :activeSectionObj="activeSectionObj"></component-text>
                    <component-video v-else-if="activeSectionObj.type==='video'"  :activeSectionObj="activeSectionObj"></component-video>
                    <component-audio v-else-if="activeSectionObj.type==='audio'"  :activeSectionObj="activeSectionObj"></component-audio>
                    <component-work v-else-if="activeSectionObj.type==='work'"  :activeSectionObj="activeSectionObj"></component-work>
                    <component-pdf v-else-if="activeSectionObj.type==='pdf'"  :activeSectionObj="activeSectionObj"></component-pdf>
                </div>
            </el-scrollbar>
            <el-footer class="lh60">
                <el-row>
                    <el-col :span="12" class="al">
                        <router-link :to="'/study/'+activeChapter+'/'+(Number(activeSection)-1)">
                            <el-button type="primary" v-if="activeSection>0">上一节</el-button>
                        </router-link>&nbsp;
                    </el-col>
                    <el-col :span="12" class="ar">
                        &nbsp;<router-link :to="'/study/'+activeChapter+'/'+(Number(activeSection)+1)">
                        <el-button type="primary" v-if="sectionList && activeSection<sectionList.length-1">下一节</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </el-container>
</template>