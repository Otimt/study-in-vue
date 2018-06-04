<script>
    export default {
        data(){
            return {
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
            <el-button type="primary" v-if="status==='not_uploaded'">上传作业</el-button>
            <el-button type="primary" v-else-if="status==='not_pass'|| status==='uploaded'">再次上传</el-button>
        </div>


    </div>
</template>