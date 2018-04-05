<template>
	<header class="header-box clearfix">
		<div class="search">
			<input type="text"  id="search" placeholder="搜索一下" />
			<i class="el-icon-search"></i>
		</div>
		<nav class="nav">
		 	<ul class="clearfix">
		 		<router-link :to="{'name':'home','params':{'user': user}}" tag='li'>首页</router-link>
		 		<router-link :to="{'name':'articals','params':{'user': user}}" tag='li'>博客</router-link>
		 		<router-link :to="{'name':'about','params':{'user': user}}" tag='li'>关于我</router-link>
				<router-link :to="{'name':'regester_login','params':{'user': user}}" tag='li' v-if = '!isLogin'>注册/登录</router-link>
				<router-link :to="{'name':'manager','params':{'user': user}}" tag='li' v-else>个人页面</router-link>
		 	</ul>	
		</nav>
	</header>	
</template>

<script>
export default {
   data(){
	   	return{
	   		user:'',
	   		isLogin:'',
	   		isHost: true,
	   	}
   	},
   	methods:{
   		verify_id(){
   			this.user = window.location.pathname.split('/')[1];	
   			if(!this.user){
   				this.$router.replace({path:'error'})
   			}
			if(!this.$store.state.userInfo){
				this.isLogin = false;
				console.log('游客');
			}else{
				this.isHost = !this.$store.state.userInfo.isHost;
				this.isLogin = true;
				if (this.$store.state.userInfo._id != this.user) {
					console.log('注册用户');
				} else {
					console.log('博客主');
					this.user = this.$store.state.userInfo._id;
					
				}
			}
   		},
   		
   		
   },
    created(){
    	this.verify_id();
    },
    mounted(){
    	
    },
 
	watch: {
        '$route' (to,from){
        	console.log(this.user)
        	if (this.$store.state.userInfo) {
        		this.isHost = !this.$store.state.userInfo.isHost;
        	}	
        },
    }	 
}
</script>


<style scoped lang="scss">
	.header-box{
	    position: fixed;
	    top: 0;
	    width: 100%;
	    min-width: 750px;
	    height: 44px;
	    background-color: rgba(102,102,102,0.5);
	    z-index: 9999;
	    .search{
	        float: left;
	        padding-left: 15px;
	        position: relative;
	        #search{ 
	            width: 20px;  
	            opacity: 0;    
	            height: 30px;
	            line-height: 30px;
	            border: none;
	            border-radius: 12px;
	            margin: 7px 0;
	            padding-left: 15px;
	            font-size: 12px;
	            transition: all .2s linear;
	            &:hover{
	            	width: 250px; 
	            	opacity: 1; 
	            }
	        }
	        .el-icon-search{
	            position:absolute;
	            top: 12px;
	            right: 6px;
	            font-size: 20px; 
	            color: #fff;  
	        }
	    }
	    .nav{
	        float: right;
	        ul{
	            padding: 0 40px;
	            li{
	                float: left;
	                width: 60px;
	                height: 40px;
	                line-height:40px;
	                font-size: 13px;
	                text-align: center;
	                color: #FFFFFF;
	                margin: 0 15px;
	                cursor: pointer;
	                border-bottom: 3.5px solid transparent;
	                &:hover{
	                  border-bottom: 3.5px solid deepskyblue;  
	                }
	            }
	            .router-link-active{
	                border-bottom: 3.5px solid deepskyblue;
	            }
	        }
	    }
	}
</style>