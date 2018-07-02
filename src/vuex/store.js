/**
 * Created by Administrator on 2018/6/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 引入 axios
import axios from 'axios'
Vue.use(Vuex);  //Vue全局使用Vuex
const store = new Vuex.Store({
    strict: true,
    state: {
        activeChapter:"0",//当前章
        courseTitle:null,//课程标题
        chapterList:null,//章节列表
        resourceList:null,//资源列表

        //播放倍速
        selectedSpeed:2,//已选中的速度，默认2，表示1.0
        speedList:['0.5','0.75','1.0','1.25','1.5','1.75','2.0'],

        //PDF手动自动
        selectedPDFModel:"auto",

        //隐藏控制界面
        UIVisible:false,

        //是否已全屏
        isFullScreen:false,
    },
    mutations: {
        SET_FULL_SCREEN(state,val){
            state.isFullScreen = val;
        },
        SET_UI_VISIBLE(state,val){
            state.UIVisible = val;
        },
        SET_PDF_MODEL(state,model){
            state.selectedPDFModel = model;
        },
        SET_SELECTED_SPEED(state,index){
            state.selectedSpeed = index;
            console.log("速度"+index)
        },
        SET_ACTIVE_CHAPTER (state,num) {
            state.activeChapter = num;
        },
        SET_COURSE_INFO(state,courseInfo){
            state.chapterList = courseInfo.chapterList;
            state.courseTitle = courseInfo.courseTitle;
            state.resourceList = courseInfo.resourceList;
            console.log(courseInfo.resourceList.list)
        }
    },
    actions:{
        fetchChapterList(context){
            axios.get("../data/core.json").then(function(res){
                console.log(res);
                context.commit("SET_COURSE_INFO",res.data)
            })
        }
    },
    getter:{
        getChapterList(){
            return this.getChapterList;
        }
    },
})
store.dispatch("fetchChapterList");
export  default  store;