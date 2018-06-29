import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
// import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件
import MainMenu from './../assets/vue/pages/main-menu.vue';
import Study from './../assets/vue/pages/study.vue';
import MainMenuStudy from './../assets/vue/pages/main-menu-study.vue';
import MainMenuStudyTlr from './../assets/vue/pages/main-menu-study-tlr.vue';
// import VVP from './../assets/vue/pages/vvp.vue';

Vue.use(Router);  //Vue全局使用Router

export default new Router({
    //配置路由，这里是个数组
    routes: [
        {
            path: '/main-menu/',
            name: '目录页',
            component: MainMenu
        // },{
        //     path: '/vvp/',
        //     name: 'vue-video-测试页',
        //     component: VVP
        },{
            //默认页重定向
            path: '/',
            redirect: '/main-menu-study-tlr/0/0'
        },{
            path: '/study/:activeChapter/:activeSection',
            name: '学习页',
            component: Study,
            props: true,
        },{
            path: '/main-menu-study/:activeChapter/:activeSection',
            name: '完整目录的学习页',
            component: MainMenuStudy,
            props: true,
        },{
            path: '/main-menu-study-tlr/:activeChapter/:activeSection',
            name: '上-左右-可隐藏目录的学习页',
            component: MainMenuStudyTlr,
            props: true,
        },
    ]
})
