/**
 * Created by Administrator on 2018/6/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);  //Vue全局使用Vuex
const store = new Vuex.Store({
    strict: true,
    state: {
        activeChapter:"0",
        courseTitle:"JavaScript高级程序设计",
        chapterList:[
            {
                title:"第一章：JavaScript简介",
                progress:"100%",
                lastVisitSection:0,
                sectionList:[
                    {
                        title:"1.1 历史简述",
                        progress:"100%",
                        type:"audio",
                    },{
                        title:"1.2 JavaScript实现",
                        progress:"100%",
                        type:"video",
                    },{
                        title:"1.3 小结",
                        progress:"100%",
                        type:"text",
                    },{
                        title:"1.4 作业",
                        progress:"100%",
                        type:"work",
                    },
                ]
            },{
                title:"第二章：在HTML中使用JavaScript",
                progress:"0%",
                sectionList:[
                    {
                        title:"2.1 <script>元素",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"2.2 嵌入代码与外部文件",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"2.3 文档模式",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"2.4 <noscript>元素",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"2.5 小结",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"2.6 作业",
                        progress:"0%",
                        type:"text",
                    },
                ]
            },{
                title:"第三章：基本概念",
                progress:"50%",
                sectionList:[
                    {
                        title:"3.1 语法",
                        progress:"100%",
                        type:"text",
                    },{
                        title:"3.2 变量",
                        progress:"100%",
                        type:"audio",
                    },{
                        title:"3.3 关键字",
                        progress:"100%",
                        type:"audio",
                    },{
                        title:"3.4 保留字",
                        progress:"0%",
                        type:"video",
                    },{
                        title:"3.5 原始值和引用值",
                        progress:"0%",
                        type:"video",
                    },{
                        title:"3.6 原始类型",
                        progress:"0%",
                        type:"video",
                    },{
                        title:"3.7 小结",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"3.8 作业",
                        progress:"100%",
                        type:"work",
                    },
                ]
            },{
                title:"第四章：变量、作用域与内存问题",
                progress:"40%",
                sectionList:[
                    {
                        title:"4.1 基本类型和引用类型的值",
                        progress:"100%",
                        type:"text",
                    },{
                        title:"4.2 执行环境及作用域",
                        progress:"0%",
                        type:"audio",
                    },{
                        title:"4.3 垃圾收集",
                        progress:"100%",
                        type:"video",
                    },{
                        title:"4.4 小结",
                        progress:"0%",
                        type:"text",
                    },{
                        title:"4.5 作业",
                        progress:"0%",
                        type:"work",
                    },
                ]
            }
        ],

        text:{

        },
        video:{

        },
        audio:{

        },
        work:{

        },
    },
    mutations: {
        setActiveChapter (state,num) {
            state.activeChapter = num;
        }
    },
    action:{},
    getter:{},
})
export  default  store;