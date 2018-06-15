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
        activeChapter:"0",
        courseTitle:null,
        chapterList:null,
    },
    mutations: {
        SET_ACTIVE_CHAPTER (state,num) {
            state.activeChapter = num;
        },
        SET_COURSE_INFO(state,courseInfo){
            state.chapterList = courseInfo.chapterList;
            state.courseTitle = courseInfo.courseTitle;
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