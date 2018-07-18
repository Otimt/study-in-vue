<script>
    import ComponenDragChoice from "../test/drag-choice.vue";
    import ComponenMultipleChoice from "../test/multiple-choices.vue";
    import ComponenSingleChoice from "../test/single-choice.vue";
    import axios from 'axios'
    export default {
        props: ['activeSectionObj','nextSectionObj'],
        data: function () {
            return {
                curQuesNum:0,
                questionList:null,
            }
        },
        mounted(){
            this.fetchChapterList();
        },
        methods:{
            fetchChapterList(){
                axios.get(this.activeSectionObj.testDataUrl).then((res)=>{
                    this.questionList = res.data.questionList
//                    context.commit("SET_COURSE_INFO",res.data)
                })
            },
            nextQues(){
                this.curQuesNum ++;
            },
            nextSection(){
                this.$emit("nextSection");
            },
        },
        components: {
            'componen-drag-choice': ComponenDragChoice,
            'componen-multiple-choice': ComponenMultipleChoice,
            'componen-single-choice': ComponenSingleChoice,
        },
    }
</script>
<style>
    .test-box{background:#333;z-index:5;}
    .test-box .el-radio{color:#bbb;}
    .test-box .el-checkbox{color:#bbb;}
</style>
<template>
<div class="w h pos-rel" v-loading="!questionList">
    <div v-if="curQuesNum>=questionList.length" class="ac white f16 pt100">
        <div>您已完成全部测试</div>
        <el-button @click="nextSection()" class="mt50" v-if="nextSectionObj">进入下一节学习</el-button>
    </div>
    <div v-else class="pos-abs t0 r0 pt10 pr50 pl50 white f16">
        第{{curQuesNum+1}}题/共{{questionList.length}}题
    </div>
    <div class="w h test-box pt20 pb20 pl50 pr50 bs-b" v-for="(question,index) in questionList" v-show="curQuesNum===index">
        <componen-drag-choice @next="nextQues()" :question="question" :index="index+1" :total="questionList.length" v-if="question.type==='drag-1-1'"></componen-drag-choice>
        <componen-multiple-choice @next="nextQues()" :question="question" :index="index+1" :total="questionList.length" v-else-if="question.type==='multiple'"></componen-multiple-choice>
        <componen-single-choice @next="nextQues()" :question="question" :index="index+1" :total="questionList.length" v-else-if="question.type==='single'"></componen-single-choice>
    </div>

</div>
</template>