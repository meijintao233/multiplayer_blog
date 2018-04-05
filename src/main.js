// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import App from './App'
import routerConfig from './router.config.js'
import storeConfig from './store.js'

import $ from 'jquery'

import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'



Vue.config.productionTip = false;
Vue.use(mavonEditor)
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

//axios 全局配置
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8081/';


Vue.prototype.normalizeDate =  (d,c) => {
	
	const date = new Date(d);
	const normalizedDate = {};
	normalizedDate.year = date.getFullYear();
	normalizedDate.month = date.getMonth() + 1;
	normalizedDate.day = date.getDate();
	normalizedDate.hour = date.getHours();
	normalizedDate.min = date.getMinutes();
	normalizedDate.sec = date.getSeconds();
	
	for (let i in normalizedDate) {
	    if (normalizedDate[i] < 10) {
	      normalizedDate[i] = '0' + normalizedDate[i];
	    }
	}
	
	if(c){
    return normalizedDate.year + '-' + normalizedDate.month + '-' + normalizedDate.day + ' ' + normalizedDate.hour + ':' + normalizedDate.min + ':' + normalizedDate.sec;
	} else {
	    return normalizedDate.year + '-' + normalizedDate.month + '-' + normalizedDate.day;
	}
};
/*
var comfirmUser = (id) => {
	axios.post('/blogger/comfirm',{
		_id: id,
	},{
		baseURL:'http://127.0.0.1:8081/',
	}).then(res => {
		console.log(1);
		return res.data;
	})
};*/



const store = new Vuex.Store(
	storeConfig,
	
);

const router = new VueRouter(
	routerConfig,
);

var img_prefix = 'data:image/png;base64,';


router.beforeEach((to,from,next) => {
	var logged_in = false;
	if(store.state.userInfo){
		logged_in = true;	
	}else if(to.name=='manager'){
		next({
			name: 'error',
		});
	}
	next();
	/*
	if(logged_in && to.path=='/blogger'){
		console.log('2')
		next({
			path:'/blogger/manager'
		})
	};
	*/
	/*
	if(!logged_in && to.matched.some(r => r.meta.needLogin)){
		console.log('1');
		next({
			name: 'error',
		});
	}else{
		console.log(logged_in)
		next({
			name: 'error',
		});
	};*/
	/*
	if(to.meta.needComfirm){
		var id = to.fullPath.split('/')[1]; 
		console.log(id);
		axios.post('/blogger/comfirm',{
			_id: id,
		},{
			baseURL:'http://127.0.0.1:8081/',
		}).then(res => {
			if(!res.data){
				console.log(1)
				next({
					name: 'blogger',
				})
			}else{
				console.log(2)
				next();
			}
		})
	};
	*/

	

})



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data(){
  	return{
  		
  	}
  },
  mounted(){
  	
  },
})


