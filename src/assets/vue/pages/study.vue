<script>
    export default {
        data: function () {
            return this.$store.state.chapterList[this.activeChapter]
        },
        created(){
            this.$store.commit("setActiveChapter",this.activeChapter);
//            this.activeSection = 1;
            console.log(this.activeSection)
//            console.log(this.$section)
            console.log(this.$store.state)
            console.log(this.$store.state.activeChapter)
        },
        props: ['activeSection','activeChapter'],
        methods: {

        },
        components: {}
    }
</script>
<style>

</style>
<template>
    <el-container class="pos-abs l0 r0 t0 b0 bg-white">
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
                <div class="left">{{sectionList[activeSection].title}}</div>
                <div class="right">进度：{{sectionList[activeSection].progress}}</div>
            </el-header>
            <div class="h60-besides">
                <el-scrollbar class="h">
                    <div class="pl20 pr20 pt20 pb20">
                        <ul>

                        </ul>
                    </div>
                </el-scrollbar>
            </div>
        </el-container>
    </el-container>
</template>
