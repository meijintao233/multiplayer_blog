


const localStorage = global.localStorage;
const sessionStorage = global.sessionStorage;

export default{
	state:{
		userInfo: JSON.parse(localStorage.getItem('userInfo')),
	},
	//只能同步
	mutations:{
		updateUserInfo(state, newUserInfo) {
	      state.userInfo = newUserInfo;
	      localStorage.setItem('userInfo',JSON.stringify(newUserInfo));
	    },
	},
	//可异步
	actions:{
		
	},
	getters:{
		get_userInfo: state => state.userInfo,
	},
	
}
