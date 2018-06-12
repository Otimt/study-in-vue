﻿import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
// import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件
import MainMenu from './../assets/vue/pages/main-menu.vue';
import Study from './../assets/vue/pages/study.vue';

Vue.use(Router);  //Vue全局使用Router

export default new Router({
    routes: [              //配置路由，这里是个数组
        {
            path: '/main-menu/',
            name: '首页',
            component: MainMenu
        },{
            //首页
            path: '/',
            redirect: '/main-menu/'
        },{
            path: '/study/:activeChapter/:activeSection',
            name: '学习页',
            component: Study,
            props: true,
        },
    ]
})