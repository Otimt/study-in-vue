// Import Vue
import Vue from 'vue'
import ElementUI from 'element-ui';
import store from './vuex/store.js'
import router from './routes/routes.js'

import screenfull from "screenfull";

Vue.use(ElementUI);
Vue.prototype.screenfull = screenfull;

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
