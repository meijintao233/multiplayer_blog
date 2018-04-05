<template>
	<div class="comment-wrap">
		<div class="comment-input clearfix">
			<div class="avatar">
				<img :src="img"/>
			</div>
			<textarea class="input-zone" v-model="msg" name=""></textarea>
			<div class="btns">
				<div class="send" @click="send">发送</div>
			</div>
		</div>
		<ul class="comment-list">
			<li class="comment" v-for="(item,index) in comments">
				<div class="header clearfix">
					<div class="avatar">
						<img :src="item.img"/>
					</div>
					<div class="desc">
						<div class="name">{{item.name}}</div>
						<div class="detail"><span>{{comments.length-index}}楼</span><span>{{item.date}}</span><span>{{item.time}}</span></div>
					</div>
				</div>
				<div class="content">{{item.content}}</div>
				<div class="foot"><span>{{item.like}}人赞</span><span>回复</span></div>
				<ul class="sub-comment-list">
					<li class="sub-comment" v-for="(item,index) in item.subComments">
						<div class="sub-comment-content">
							<span class="name">{{item.name}}</span><span class="name">@{{item.reply}}</span><span>{{item.content}}</span>
						</div>
						<div class="sub-foot"><span>{{item.date}}</span><span>{{item.time}}</span><span>回复</span></div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				img:'../../../static/img/hRdRxnHyjxU.jpg',
				comments:[
//					{
//						img:'../../../static/img/hRdRxnHyjxU.jpg',
//						name:"粉色毕加索",
//						date:'2018.04.04',
//						time:'19:22',
//						content:'难道以前只有我觉得第三部好看吗？？？！难道以前只有我觉得第三部好看吗？？？！难道以前只有我觉得第三部好看吗？？？！难道以前只有我觉得第三部好看吗？？？！难道以前只有我觉得第三部好看吗？？？！难道以前只有我觉得第三部好看吗？？？！',
//						like:10,
//						subComments:[
//							{
//								name: '粉色毕加索',
//								reply: '毕加索',
//								content: '确实挺好确实挺好确实挺好确实挺好看的打算',
//								date:'2018.04.04',
//								time:'19:22',
//							},
//							{
//								name: '粉色毕加索',
//								reply: '毕加索',
//								content: '确实挺好确实挺好确实挺好确实挺好看的打算',
//								date:'2018.04.04',
//								time:'19:22',
//							},
//							{
//								name: '粉色毕加索',
//								reply: '毕加索',
//								content: '确实挺好确实挺好确实挺好确实挺好看的打算',
//								date:'2018.04.04',
//								time:'19:22',
//							},
//						],
//					},
				],
				msg: '',
				flag: false,
			}
		},
		created(){
//			this.$http.get('',function(){
//				
//			})
		},
		props:['resComment','resList'],
		watch:{
			resComment(){
				this.flag = true;
				if(this.flag){
					var data = this.resComment.comment;
					this.comments.unshift(
						{
							img:'../../../static/img/hRdRxnHyjxU.jpg',
							name:data._user.name,
							date:this.normalizeDate(data.time,true).split(' ')[0],
							time:this.normalizeDate(data.time,true).split(' ')[1],
							content:data.content,
							like:data.like,
							subComments:[],
						},
					)
					this.flag = false;
				}
			},
			resList(){
				this.flag = true;
				if(this.flag){
					var data = this.resList.comment._comment;
					for(var i=data.length-1;i>=0;i--){
						
						this.comments.push({
							img: this.img,
							name:data[i]._user.name,
							date:this.normalizeDate(data[i].time,true).split(' ')[0],
							time:this.normalizeDate(data[i].time,true).split(' ')[1],
							content:data[i].content,
							like:data[i].like,
							subComments:[],
						});
					}
					
						
					
				}
			}
		},
		
		methods:{
			send(){
				this.$emit('sendMsg',{'msg':this.msg});

			}
		}
		
	}
</script>

<style lang="scss" scoped> 
	.comment-wrap{
		width: 100%;
		margin-top: 40px;
		.comment-input{
			width: 800px;
			margin: 0 auto;
			
			.avatar{
				float: left;
				
				width: 30px;
				height: 30px;
				img{
					width: 100%;
					height: 100%;
					border-radius: 50%;
					overflow: hidden;
				}
			}
			textarea{
				float: left;
				resize: none;
				width: 90%;
				height: 100px;
				padding: 10px;
				margin-left: 10px;
				border-radius: 5px;
				border: 1px solid #d9d9d9;
				overflow-x: hidden;
				font-size: 15px;
				background-color: #f0f0f0;
			}
			.btns{
				float: left;
				width: 100%;
				margin-top: 15px;
				.send{
					width: 80px;
					height: 30px;
					line-height: 30px;
					border-radius: 10px;
					margin: 0 auto;
					text-align: center;
					background-color: #42c02e;
					color: #fff;
					font-size: 15px;
					cursor: pointer;
				}
			}
		}
		.comment-list{
			width: 800px;
			margin: 0 auto;
			margin-top: 20px;
			.comment{
				padding: 20px 0;
				border-bottom: 1px solid #f0f0f0;
				.header{
					height: 50px;
					.avatar{
						float: left;
						margin: 10px 0;
						width: 30px;
						height: 30px;
						img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
							overflow: hidden;
						}
					}
					.desc{
						float: left;
						padding-top: 5px;
						margin-left: 10px;
						font-size: 12px;
						.name{
							font-size: 14px;
							color: #000;
							
						}
						.detail{
							&>span{
								margin-right: 5px;
							}
						}
					}
				}
				.content{
					width: 100%;
					margin: 15px 0;
					text-align: justify;
					font-size: 17px;
					color: #000;
				}
				.foot{
					font-size: 15px;
					&>span{
						margin-right: 30px;
						cursor: pointer;
					}
				}
				.sub-comment-list{
					width: 100%;
					margin-top: 15px;
					border-left: 2px solid #d9d9d9;
					padding-left: 20px;
					.sub-comment{
						padding: 15px 0;
						border-bottom: 1px dashed #f0f0f0;
						.sub-comment-content{
							width: 100%;
							margin-bottom: 5px;
							text-align: justify;
							font-size: 15px;
							color: #000;
							
							.name{
								margin-right: 5px;
								color: #3194d0;
								cursor: pointer;
							}
						}
						.sub-foot{
							font-size: 14px;
							&>span{
								margin-right: 10px;
								&:nth-child(3){
									cursor: pointer;
									
								}
							}
						}
					}
				}
			}
		}
	}
	
</style>