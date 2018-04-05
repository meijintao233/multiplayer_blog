<template>
	<div class="blog_add">	
	    <el-form :model="blog" :rules="rules" style="width:80%;" class='from'>
	      　　　    <el-form-item label="标题" prop="title">
	        　　　　    <el-input v-model="blog.title"></el-input>
	      　　　    </el-form-item>
	      　　　
	      	<!--<el-form-item label="文章类别" prop="category">
	        　　　	<el-input v-model="blog.category"></el-input>
	      	</el-form-item>
		    
		    <el-form-item label="简介">
		        　　<el-input
		          type="textarea"
		          placeholder="请输入文章简介"
		          :autosize="{ minRows: 2}"
		          v-model="blog.briefIntro">
		        </el-input>
		    </el-form-item>-->
			
			<el-form-item label="内容">
		        <el-input
		          type="textarea"
		          :autosize="{ minRows: 25}"
		          placeholder="请输入内容"
		          v-model="blog.content">
		        </el-input>
		    </el-form-item>
		    
		    <el-form-item>
		        <el-button class='btn' type="primary"  @click="submit" round>立即发表</el-button>
		    </el-form-item>
	    </el-form>
    </div>
</template>

<script>
	export default {
	    data() {
		    return {
		        blog: {
			        title: '',
			        category: '',
		         	briefIntro: '',
			        content: '',
		        },
		        rules: {
			        title: [
			        	{required: true, message: 'please input blog title!', trigger: 'blur'},
			        ],
			        category: [
			            {required: true, message: 'please input blog category!', trigger: 'blur'},
			        ],
		        },
		    }
    	},
    	methods:{
    		submit(){
//  			if (this.blog.title == '' || this.blog.category =='') {
//  				this.$message({
//  					message:'title or category can not be empty!',
//  					type:'warning',
//  				});
//  				return;
//  			}
    			this.$http.post('/blogger/'+this.$store.state.userInfo._id +'/add',{
    				title: this.blog.title,
//  				category: this.blog.category,
//		            briefIntro: this.blog.briefIntro,
		            content: this.blog.content,
    			})
    			.then(res=>{
//  				if (res.data.condition == 0) {
////  					this.$message({
////  						message: 'Artical has been stored,please wait for three minuates!',
////           				type: 'success',
////  					});
//  					
//  				} else {
////  					this.$message({
////				            message: 'server error!',
////				            type: 'error'
////				        });
//  				}
console.log(res)
					var that = this;
//					setTimeout(function(){
//						console.log(res)
//						that.$router.push({name:'manager'})
//					},3000);
    			})
    			.catch(res=>{
    				console.log('error:' + res);
    			})
    		},
    	},
    	
	}    
</script>

<style scoped lang="scss">
	.from{
		margin: 40px auto;
		padding: 80px 0;
	}
	.btn{
		display: block;
		margin: 0 auto;
		margin-top: 20px;
	}
	
	
	
</style>