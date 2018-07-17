<script>
    export default {
        props: ['question','index','total'],
        data(){
            return {
                isAnswerVisible:false,//正确答案是否已显示
                checkList: [],
                trueValueArr:["A","B","C","D","E","F","G","H"]
            }
        },
        methods:{
            nextQues(){
                this.$emit("next")
            },
            showAnswer(){
                this.isAnswerVisible = true;
            }
        }
    };
</script>
<style></style>
<template>
    <div class="w h">
        <div class="f16 mt20 mb20 white">{{index}}、{{question.subject}}</div>
        <el-checkbox-group v-model="checkList">
            <ul>
                <li class="m10" v-for="(option,index) in question.option">
                    <el-checkbox :label="trueValueArr[index]">{{option}}</el-checkbox>
                </li>
            </ul>
        </el-checkbox-group>
        <div class="mt20">
            <el-button @click="showAnswer" v-show="!isAnswerVisible" size="small">查看答案</el-button>
            <span class="white mr20" v-show="isAnswerVisible">正确答案：{{question.correctAnswer}}</span>
            <el-button @click="nextQues" v-show="isAnswerVisible"  size="small">继续</el-button>
        </div>
    </div>
</template>