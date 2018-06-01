<script>
    export default {
        data(){
          return this.$store.state;
        },
        created () {
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.$store.commit("setActiveChapter",key);
            }
        }
    }
</script>
<style>
    .el-scrollbar__wrap {
       overflow-x: hidden;
    }
    .h60{height:60px;}
    .lh60{line-height:60px;}
    .b-b-gray{border-bottom:1px solid #e6e6e6;}
    .b-r-gray{border-right:1px solid #e6e6e6;}
    .main-v-menu{height:calc(100% - 60px);overflow:auto;}
</style>
<template>
    <el-container class="pos-abs l0 r0 t0 b0 bg-white">
        <el-aside>
            <div class="pl20 pr30 pt10 bs-b black b-b-gray b-r-gray">
                <div class="al f16">{{courseTitle}}</div>
                <div class="al f12">课程大纲</div>
            </div>
            <el-menu :default-active="activeChapter" class="main-v-menu" @select="handleSelect">
                <el-scrollbar class="h">
                    <el-menu-item class="hideoverflow" v-for="(chapter,  index) in chapterList" :index="index.toString()" :key="chapter.title">
                        <el-row :title="chapter.title">
                            <el-col :span="3" class="ac"><i class="el-icon-menu"></i></el-col>
                            <el-col :span="16" class="al ellipsis">{{chapter.title}}</el-col>
                            <el-col :span="5" class="ac">{{chapter.progress}}</el-col>
                        </el-row>
                        <span class="dis-i" :span="16"></span><span></span>
                    </el-menu-item>
                </el-scrollbar>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="lh60 b-b-gray">
                <div class="left">{{chapterList[activeChapter].title}}</div>
                <div class="right">进度：{{chapterList[activeChapter].progress}}</div>
            </el-header>
            <div class="main-v-menu">
                <el-scrollbar class="h">
                    <div class="pl20 pr20 pt20 pb20">
                        <ul>
                            <li class="mb20 f16" v-for="(section,  index) in chapterList[activeChapter].sectionList">
                                <router-link :to="'/study/'+activeChapter+'/'+index">
                                    <span class="el-icon-document"></span><span>{{section.title}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
</template>

