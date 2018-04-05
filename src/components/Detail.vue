<template>
	<div class="detail-wrap">
		<div class="detail">
			
			<div class="clearfix">
				<label>名字</label>
				<input type="text" v-model="name"/>
			</div>
			<div class="clearfix">
				<label>个性签名</label>
				<input type="text" v-model="desc"/>	
			</div>
			<div class="clearfix">
				<label>上传图片</label>
				<input type="file" name="" class="upload" @change="upload()" />
				<p>
					<img  />
				</p>
			</div>
			<div class="btn" @click="submit()">提交</div>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				desc:'',
				img:'',
			}
		},
		watch:{
			name:function(){
				console.log(this.name)
			},
			desc:function(){
				console.log(this.desc)
				
			},
			img:function(){
				console.log(this.img)
			},
		},
		methods:{
			upload(){
				var file = $(".upload")[0].files[0]
				
				if(window.FileReader){
					var fr = new FileReader(); 
					var that = this;
					fr.onload = function(e){
						that.img = e.target.result;
						$('.clearfix>p').html('<img src='+ that.img +' />')
						$('.clearfix>p>img').addClass('img')
//						$('.clearfix>p>img').attr('src',that.img)
					}
					fr.readAsDataURL(file)
				}
			},
			submit(){
				this.$http.post('/blogger/userInfo',{
					name:this.name,
					desc:this.desc,
					img:this.img.split(",")[1],
					id:this.$store.state.userInfo._id,
				})
				.then(res => {
					if(res.data.state){
						
					} else {
						this.$router.replace({name:'manager'})						
					}
			        
				})
			},
		},
		
	}
</script>

<style scoped lang="scss">
	.detail-wrap{
		font-size: 15px;
		position: relative;
		width: 350px;
		margin: 0 auto;
		.detail{
			height: 400px;
		}
		div{
			margin-bottom: 15px;
			.upload{
				opacity: 0;
				position: absolute;
				z-index: 100;
			}
			p{
				width: 400px;
				position: absolute;
				margin-left: 100px;
				border: 1px solid #000000;
				.img{
					width: 100%;
					overflow: hidden;
				}
			}
		}
		label{
			
			display: block;
			width: 100px;
			float: left;
			text-align: center;
		}
		input{
			border: 1px solid black;
			float: left;
			width: 150px;
			height: 20px;
		}
		.btn{
			width: 200px;
			position: absolute;
			left: 0;
			right: 0;
			bottom: -40px;
			margin: 0 auto;
			text-align: center;
			cursor: pointer;
			border: 1px solid #000000;
		}
	}
</style>