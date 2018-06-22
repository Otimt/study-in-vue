<script>
    export default {
        props: ['activeSectionObj'],
        data(){
            return {
                fileList: [
//                    {
//                        name: 'food.jpeg',
//                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//                    }, {
//                        name: 'food2.jpeg',
//                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//                    }
                ],
                status:"not_uploaded",//not_uploaded | uploaded | passed | failed
                score:"",
            };
        },
        beforeCreate(){

        },
        created () {
        },
        methods: {
            statusText(){
                switch (this.status){
                    case "uploaded":
                        return "上传成功，请等待批阅。"
                        break;
                    case "not_pass" :
                        return "很遗憾，你的作业做得不行啊。"
                        break;
                    case "passed":
                        return "恭喜你已成功通过！";
                        break;
                    case "not_uploaded":
                    case "":
                    default:
                        return "未上传作业。"
                }
            },
            //element组件抄过来 http://element-cn.eleme.io/#/zh-CN/component/upload
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<style>
    .upload-bg{background:#1a1c1f;}
</style>
<template>
    <div class="w h pos-rel">
        <div class="h60-besides w">
            <div class="right-tool-bar"></div>
            <iframe  id="pdfFrame" :src="'../iframe/pdf/web/viewer-pdf.html?pdf='+activeSectionObj.pdf" class="w h60-besides" frameborder="0"></iframe>
        </div>
        <div class="pos-abs b0 l0 ac w upload-bg lh60">
            <!--multiple-->
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="success">
                    <template v-if="status==='not_uploaded'">上传作业</template>
                    <template v-else-if="status==='not_pass'|| status==='uploaded'">再次上传</template>
                </el-button>
                <span slot="tip" class="el-upload__tip gray">上传文件不能超过500kb</span>
            </el-upload>
        </div>
    </div>
</template>