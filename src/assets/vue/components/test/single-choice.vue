<script>
    export default {
        props: ['question','index','total'],
        data(){
            return {
                isAnswerVisible:false,//正确答案是否已显示
                radio:null,
                trueValueArr:["A","B","C","D","E","F","G","H"],
            }
        },
        methods:{
            nextQues(){
                this.$emit("next")
            },
            showAnswer(){
//                console.log(this.radio)
                this.isAnswerVisible = true;
            }
        }
    };
</script>
<style></style>
<template>
    <div class="w h">
        <div class="f16 mt20 mb20 white">{{index}}、{{question.subject}}</div>
        <ul>
            <li class="m10" v-for="(option,index) in question.option" >
                <el-radio v-model="radio"  :label="trueValueArr[index]">{{trueValueArr[index]}}、{{option}}</el-radio>
            </li>
            <!--<li>-->
                <!--<el-radio v-model="radio" label="2">备选项</el-radio>-->
            <!--</li>-->
            <li class="mt20">
                <el-button @click="showAnswer" v-show="!isAnswerVisible"  size="small">查看答案</el-button>
                <span class="white mr20" v-show="isAnswerVisible">正确答案：{{question.correctAnswer}}</span>
                <el-button @click="nextQues" v-show="isAnswerVisible"  size="small">继续</el-button>
            </li>
        </ul>

    </div>
</template>