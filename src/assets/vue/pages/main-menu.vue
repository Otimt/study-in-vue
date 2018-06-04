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

</style>
<template>
    <el-container class="pos-abs l0 r0 t0 b0 bg-white">
        <el-aside>
            <div class="pl20 pr30 pt10 bs-b black b-b-gray b-r-gray h60">
                <div class="al f16">{{courseTitle}}</div>
                <div class="al f12">课程大纲</div>
            </div>
            <el-menu :default-active="activeChapter" class="h60-besides" @select="handleSelect">
                <el-scrollbar class="h">
                    <el-menu-item class="hideoverflow" v-for="(chapter,  index) in chapterList" :index="index.toString()" >
                        <el-row :title="chapter.title">
                            <el-col :span="3" class="ac"><i class="el-icon-menu"></i></el-col>
                            <el-col :span="16" class="al ellipsis">{{chapter.title}}</el-col>
                            <el-col :span="5" class="ac">{{chapter.progress}}</el-col>
                        </el-row>
                    </el-menu-item>
                </el-scrollbar>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="lh60 b-b-gray">
                <div class="left f14">{{chapterList[activeChapter].title}}</div>
                <div class="right">进度：{{chapterList[activeChapter].progress}}</div>
            </el-header>
            <div class="h60-besides">
                <el-scrollbar class="h">
                    <div class="pl20 pr20 pt20 pb20">
                        <ul>
                            <li class="mb20 f16" v-for="(section,  index) in chapterList[activeChapter].sectionList">
                                <router-link :to="'/study/'+activeChapter+'/'+index">
                                    <span class="el-icon-document"></span> <span>{{section.title}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
</template>

