<script>
    export default {
        props: [
            'visible',
            'activeSectionObj',
            'nextSectionObj',
        ],
        data(){
            return {
                feedbackError:"",
                submitStatus:"new",//new -> submitting -> submitted
                tagList:{
                    "-1":["口齿不清","逻辑混乱","拔苗助长","长得难看","不知所云"],
                    "0":["平铺直述","勉强听懂","理都懂然并卵","难度太高","难度太低"],
                    "1":["深入浅出","条理分明","内容详细","有感染力","循循善诱",]
                },
                form: {
                    evaluation:null,//评价
                    tags:[],
                    suggest: '',//建议
                },
            };
        },
        watch:{
            "form.evaluation":function(){
                this.verifyForm();
                this.cheanTag();
            }
        },
        methods:{
            //表单验证
            verifyForm(){
                if(this.form.evaluation===null){
                    this.feedbackError = "请选择一项评价";
                    return false;
                }else{
                    this.feedbackError = ""
                    return true
                }
            },
            //重置标签
            cheanTag(){
                this.form.tags = [];
            },
            onSubmit(){
                if(this.verifyForm()){
                    //显示提交中
                    this.submitStatus = "submitting";

                    //跳转到 nextLink
                    setTimeout(function(){
                        window.location.hash = this.nextSectionObj.link;
                    }.bind(this),2000)
                };
            },
            setEvaluation(value){
                this.form.evaluation = value
            }
        },
        computed:{
            curSectionTitle(){
                return this.activeSectionObj.title;
            },
        },
    }
</script>
<style>
    .evaluation{font-size:75px;line-height:120px;}
    .evaluation .evaluation-btn{opacity:0.5;cursor:pointer;}
    .evaluation .evaluation-btn:hover{opacity:0.8}
    .evaluation .evaluation-btn.selected{opacity:1}
    .evaluation .evaluation-btn.selected:hover{opacity:1}
    .feedbackError{color:red;line-height:15px;}
    .suggest{}
</style>
<template>
    <el-dialog id="feedback-dialog" width="550px" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="visible" :show-close="false">

        <el-form ref="form" :model="form" id="feedback-form" element-loading-text="正在提交" target="#feedback-form"  v-loading="submitStatus=='submitting'">
            <div class="ac">
                你已完成 {{curSectionTitle}}
            </div>
            <div class="ac">你觉得这节课如何？</div>
            <div class="ac evaluation">
                <span :class="'evaluation-btn '+(form.evaluation===-1?'selected':'')" title="很差" @click="setEvaluation(-1)">😡</span>
                <span :class="'evaluation-btn '+(form.evaluation===0?'selected':'')" title="一般" @click="setEvaluation(0)">😞</span>
                <span :class="'evaluation-btn '+(form.evaluation===1?'selected':'')" title="很好" @click="setEvaluation(1)">😆</span>
            </div>
            <div v-if="form.evaluation!==null">
                课程标签
                <el-checkbox-group v-model="form.tags" size="mini">
                    <el-checkbox class="ml10" v-for="tag in tagList[form.evaluation.toString()]" :label="tag" border></el-checkbox>
                </el-checkbox-group>
            </div>
            <el-form-item class="mt20">
                <el-input type="textarea" v-model="form.suggest" placeholder="你建议我们如何改进？（选填）"></el-input>
            </el-form-item>
            <div v-if="nextSectionObj">
                <div class="clearfix">
                    接下来 {{nextSectionObj.title}}
                    <el-button class="right" type="primary" @click="onSubmit">开始下一课学习</el-button>
                </div>
                <div class="feedbackError ar">{{feedbackError}}</div>
            </div>
        </el-form>
    </el-dialog>
</template>

