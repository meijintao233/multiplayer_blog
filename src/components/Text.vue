<template>
	<div class="artical-wrap">
		<div class="text">
			<h1>{{blog.title}}</h1>
			<!--<h2>{{blog.briefIntro}}</h2>-->
			<!--<h2>介绍</h2>
			<p>一直关注 数据科学 、 机器学习 的同学，一定会经常看到或听到关于 深度学习 和 神经网络 相关信息。如果你对 深度学习 感兴趣，但却还没有实际动手操作过，你可以从这里得到实践。</p>
	　　		<p>在本文中，我将介绍 TensorFlow , 帮你了解 神经网络 的实际作用，并使用 TensorFlow 来解决现实生活中的问题。 读这篇文章前，需要知道 神经网络 的基础知识和一些熟悉编程理念，文章中的代码是使用 Pyhton 编写的，所以还需要了解一些 Python 的基本语法，才能更有利对于文章的理解。</p>
			<h3>目录</h3>
			<p><strong>使用 TensorFlow 的优点是：</strong></p>-->
			<p v-for="item in blog.content">{{item}}</p>
			<div class="bottom">
				<a href="javascript:void(0)" class="reward">打赏一个呗</a>
			</div>
		</div>
		<Comment v-on:sendMsg='getMsg' :res-comment='comment' :res-list='list'></Comment>
	</div>
	
</template>

<script>
	import Comment from '@/components/Comments';
	export default{
		data(){
			return{
				blog: '',
				msg:'',
				list:[],
				comment:[],
			}
		},
		components:{
			Comment,
		},
		methods:{
			getMsg(data){
				this.msg = data.msg; 
				this.$http.post('blogger/'+ window.location.pathname.split('/')[1] + '/comment',{
	    		'id':  this.$route.query['s'],
	    		'content': this.msg,
	    		'msger': this.$store.state.userInfo._id,
		    	}).then((res)=>{
		    		this.comment = res.data;
		    	})
			},
		},
		created(){
			
			this.$http.get('blogger/'+ this.$route.params.user +'/text?s=' + this.$route.query['s'])
	    	.then(res => {
		        this.blog = res.data.content;
		        this.blog.content = this.blog.content.split('\n')
	    	})
	    	.catch(res => {
	        	console.log('error:' + res);
	      	});
	      	
	    	this.$http.get('blogger/'+ window.location.pathname.split('/')[1] + '/comment?id='+this.$route.query['s']).then((res)=>{
	    		this.list = res.data;
	    	})
		},
	}
</script>

<style scoped lang="scss">
	.text{
		width: 800px;
		min-height: 1000px;
		margin: 0 auto;
		position: relative;
		h1{
			font-size: 30px;
			padding: 20px 0;
			color: #333;
			word-spacing: 2px;
		}
		h2{
			font-size: 20px;
			padding: 20px 0;
			font-weight: lighter;
			color: #333;
		}
		p{
			padding: 0 15px;
			text-indent: 20px;
			margin: 5px 0;
			font-size: 15px;
			text-align: justify;
			color: #333;
		}
		h3{
			font-size: 18px;
		    border-radius: 5px;
		    padding: 5px 15px;
		    background: #B9D3EE;
		    box-shadow: 0px 5px 5px #9FB6CD;
		    border-left: 6px solid #1874CD;
		    margin: 10px 0;
		}
		strong{
			font-weight: bold;
		}
		.bottom{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 0 auto;
			height: 45px;
			
			.reward{
				display: block;
			    width: 100px;
			    margin: 0 auto;
			    height: 25px;
			    line-height: 25px;
			    padding: 10px;
			    background-color: #E74851;
			    color: #fff;
			    text-align: center;
			    border-radius: 10px;
			    font-weight: bold;
			    font-size: 16px;
			    transition: all 0.3s;
			    &:hover{
			    	opacity:0.8;
			    	padding:15px;
			    	font-size:18px;
			    	color: #42B983;
			    }
			}
		}
	}
</style>