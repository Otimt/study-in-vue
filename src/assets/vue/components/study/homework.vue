<script>
    export default {
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
                directions:"<p class='t2em'>富文本</p><p class='t2em'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>",
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

</style>
<template>
    <div>
        <div>作业说明</div>
        <div v-html="directions"></div>

        <div class="mt20">状态：{{ statusText() }}</div>
        <div class="mt20 ac">
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
                <el-button size="small" type="primary">
                    <template v-if="status==='not_uploaded'">上传作业</template>
                    <template v-else-if="status==='not_pass'|| status==='uploaded'">再次上传</template>
                </el-button>
                <div slot="tip" class="el-upload__tip">上传文件不能超过500kb</div>
            </el-upload>
        </div>


    </div>
</template>