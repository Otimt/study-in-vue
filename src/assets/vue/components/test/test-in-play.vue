<script>
    import ComponenDragChoice from "../test/drag-choice.vue";
    import ComponenMultipleChoice from "../test/multiple-choices.vue";
    import ComponenSingleChoice from "../test/single-choice.vue";

    import axios from 'axios'

    export default {
        props: ['activeSectionObj','time'],
        data() {
            return {
                testVisible:false,//测试题是否显示
                curQuesNum: 0,
                questionList: null,
            }
        },
        mounted(){
            this.fetchChapterList();
        },
        computed:{
            time2test(){
                return this.activeSectionObj.time2test.timeList;
            },
        },
        watch:{
            "time":"isTestVisible"
        },
        methods:{
            fetchChapterList(){
                console.log("加载")
                axios.get(this.activeSectionObj.time2test.url).then((res)=>{
                    this.questionList = res.data.questionList
                })
            },
            isTestVisible(){
                var testIndex = this.time2test.indexOf(this.time);
                if(testIndex>-1){
                    this.showTestAndPause(testIndex);
                }
                console.log(this.time)
            },
            //播放中测试题相关
            showTestAndPause(testIndex){
                this.testVisible = true;
                this.curQuesNum = testIndex;
                this.$emit("showtestandpause");
            },
            hideTestAndContinue(){
                this.testVisible = false;
                this.$emit("hidetestandcontinue");

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
    <div class="w h pos-abs t0 l0 test-box" v-show="testVisible" v-loading="!questionList">
        <div class="w h pt20 pb20 pl50 pr50" v-for="(question,index) in questionList" v-show="curQuesNum===index">
            <componen-drag-choice @next="hideTestAndContinue()" :question="question" :index="index+1" :total="questionList.length" v-if="question.type==='drag-1-1'"></componen-drag-choice>
            <componen-multiple-choice @next="hideTestAndContinue()" :question="question" :index="index+1" :total="questionList.length" v-else-if="question.type==='multiple'"></componen-multiple-choice>
            <componen-single-choice @next="hideTestAndContinue()" :question="question" :index="index+1" :total="questionList.length" v-else-if="question.type==='single'"></componen-single-choice>
        </div>
    </div>
</template>