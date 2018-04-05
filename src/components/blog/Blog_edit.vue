<template>
	<div class="blog_add">	
	    <el-form :data="blog" :rules="rules" style="width:80%;" class='from'>
	      　　　<el-form-item label="标题" prop="title">
	        　　　　<el-input v-model="blog.title"></el-input>
	      　　　</el-form-item>
	      　　　
	      	<el-form-item label="文章类别" prop="category">
	        　　　	<el-input v-model="blog.category"></el-input>
	      	</el-form-item>
		    
		    <el-form-item label="简介">
		        　　<el-input
		          type="textarea"
		          placeholder="请输入文章简介"
		          :autosize="{ minRows: 2}"
		          v-model="blog.briefIntro">
		        </el-input>
		    </el-form-item>
			
			<el-form-item label="内容">
		        <el-input
		          type="textarea"
		          :autosize="{ minRows: 25}"
		          placeholder="请输入内容"
		          v-model="blog.content">
		        </el-input>
		    </el-form-item>
		    
		    <el-form-item class='btn'>
		        <el-button type="primary" @click="submit">立即发表</el-button>
		        <el-button type="danger">取消</el-button>    
		    </el-form-item>
	    </el-form>
    </div>
</template>

<script>
	export default {
	    data() {
		    return {
		        blog:[],
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
    	created() {
    		console.log(this.$route.query['s'])
	    	this.$http.get('http://localhost:8081/blogger/edit?s=' + this.$route.query['s'])
	    	.then(res => {
		        this.blog = res.data.content;  
	    	})
	    	.catch(res => {
	        	console.log('error:' + res);
	      	})
	    },
    	methods:{
    		submit(){
    			if (this.blog.title == '' || this.blog.category =='') {
    				this.$message({
    					message:'title or category can not be empty!',
    					type:'warning',
    				});
    				return;
    			};
    			this.$http.post('/blogger/edit',{
    				s: this.$route.query['s'],
    				title: this.blog.title,
    				category: this.blog.category,
		            briefIntro: this.blog.briefIntro,
		            content: this.blog.content,
    			},{
    				baseURL:'http://127.0.0.1:8081',
    				
    			})
    			.then(res=>{
    				if (res.data.condition == 0) {
    					this.$message({
    						message: 'Artical has been edited,please wait for three minuates!',
             				type: 'success',
    					});
    					var that = this;
    					setTimeout(function(){
    						that.$router.push({path:'/blogger/artical'})
    					},3000);
    				} else {
    					this.$message({
				            message: 'server error!',
				            type: 'error'
				        });
    				}
    			})
    			.catch(res=>{
    				console.log('error:' + res);
    			});
    		},
    	},
    	
	}    
</script>


<style scoped>
	.from{
		margin: 40px auto;
	}
	.btn{
		text-align: center;
	}
</style>