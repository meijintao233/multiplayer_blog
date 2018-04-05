<template>
	
		<div class="register-login">
			<div class="top clearfix">
				<div><span @click="!register && toggle()" :class=[{active:register}]>注册</span></div>
				<div><span @click="!login && toggle()" :class=[{active:login}]>登录</span></div>
			</div>
			
		
			
			<!--register-->
			<div class="register" v-show="register">
				<div class="middle-register">
					<div class="clearfix">
						<p>手机号</p>
						<input type="number" placeholder="请输入手机号" v-model="account"/>
					</div>
					<div class="clearfix">
						<p>登录密码</p>
						<input type="password" placeholder="请输入6~16位字母和数字的组合" v-model="password"/>
					</div>
					<div class="clearfix">
						<p>确认密码</p>
						<input type="password" placeholder="请确认您的登录密码" v-model="repeatPwd"/>
					</div>
				</div>
				
				<div class="btn-register" @click="registerFn()">注册</div>
			</div>
			
			
			<!--login-->
			<div class="login " v-show="login">
				<div class="middle-login">
					<div class="clearfix">
						<p>手机号</p>
						<input type="number" placeholder="请输入手机号" v-model="account" />
					</div>
					<div class="clearfix">
						<p>登录密码</p>
						<input type="password" placeholder="请输入登录密码" v-model="password"/>
					</div>
				</div>
			<!--
            	<div class="bottom-login clearfix">
					<div>
						<i class="iconfont icon-square"></i>
						<span>记住我</span>
					</div>
					<div>
						<span>忘记密码?</span>
					</div>
				</div>
			-->
				<div class="btn-login" @click="loginFn()">登录</div>
			</div>	
			
			
			
			<div class="forget-password" v-show="false">
				<div class="top">
					忘记密码
				</div>
				<div class="middle-forget">
					<div class="clearfix">
						<p>手机号</p>
						<input type="number" placeholder="请输入手机号" v-model="account"/>
					</div>
					<div class="clearfix">
						<p>登录密码</p>
						<input type="password" placeholder="请输入6~16位字母和数字的组合" v-model="password"/>
					</div>
					<div class="clearfix">
						<p>确认密码</p>
						<input type="password" placeholder="请确认新的密码" v-model="repeatPwd"/>
					</div>
				</div>
				<div class="btn-forget">提交</div>
			</div>
		 
		</div>
		
	
	
</template>

<script>
	
	export default{
		data(){
			return{
				register: false,
				login: true,
				account: '',
				password: '',
				repeatPwd: '',
				user: {},
				isHost: false,
			}
		},
		created(){
			
		},
		methods:{
			toggle(){
				this.register = !this.register;
				this.login = !this.login;
				this.account = '';
				this.password = '';
				this.repeatPwd = '';
			},
			registerFn(){
				if (this.account == '') {
//		          	this.$message({
//  					message:'Please input your phone number!',
//  					type:'warning',
//  				});
		          return;
		        }
		        if (this.password == '') {
//		          	this.$message({
//  					message:'Please input your password!',
//  					type:'warning',
//  				});
		          return; 
		        }
		        if (this.password != this.repeatPwd) {
//		          	this.$message({
//  					message:'Please confirm your password!',
//  					type:'warning',
//  				});
		          return;
		        }
		        this.$http.post('/blogger/register', {
			        account: this.account,
			        password: this.password,
		        })
		        .then(res => {
			        	this.toggle();
			        	this.user = res.data.user;
						console.log(res.data)
						this.$router.push({name:'detail'})
			        	this.$store.commit('updateUserInfo',this.user);									        
		        })
		        .catch(res => {
		          console.log('error:' + res);
		        });
		       
			},
			loginFn(){
				if (this.account == '') {
//		          	this.$message({
//  					message:'Please input your phone number!',
//  					type:'warning',
//  				});
		          return;
		        }
		        if (this.password == '') {
//		          	this.$message({
//  					message:'Please input your password!',
//  					type:'warning',
//  				});
		          return; 
		        }
		        this.$http.post('/blogger/login', {
			        account: this.account,
			        password: this.password,
		        })
		        .then(res => {
			        if(res.data.condition != 0) {
//			        	this.$message({
//	    					message: res.data.message,
//	    					type:'warning',
//	    				});
			            return;
			        } else {
			            this.login = !this.login;
			            this.isHost = res.data.user.isHost;
			            this.account = res.data.user.account;
			            this.user = res.data.user;
			            this.$store.commit('updateUserInfo',this.user);
			            this.$router.push({name:'manager',params:{user:this.user._id}});
			        };
		        })
		        .catch(res => {
		          console.log('error:' + res);
		        });
			}
		},
		
	}
	
</script>

<style scoped lang="scss">
	.active{
		color: #42B983;
	}

</style>