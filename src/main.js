// Import Vue
import Vue from 'vue'
import ElementUI from 'element-ui';
import store from './vuex/store.js'
import router from './routes/routes.js'

// Import Routes

Vue.use(ElementUI);


//引入公共样式*/
import './assets/css/reset.less'
import './assets/css/global.less'
import 'element-ui/lib/theme-chalk/index.css';


// Init App
new Vue({
	el: '#app',
	store,
	router,
	template: '<router-view></router-view>',
});
