<template>
	<transition enter-active-class='lightSpeedIn' leave-active-class='lightSpeedOut'  class='about' >
		<div class="my-info animated" >
			
			<div class="my-img" @mouseenter="rotate" @mouseleave="rotate"  :class=[{rotate:rotateY}]>
				<img  :src="image"/>
				<div class="concern" :class=[{hidden:!rotateY}] @click="sendConcern">关注</div>
			</div>
			<div class="my-detail" @mouseenter="rotate" @mouseleave="rotate">
				<div class="vertical-center">
					<h2>{{name}}</h2>
					<h3>{{desc}}</h3>
				</div>
			</div>
			<transition enter-active-class='zoomIn' leave-active-class='hide'>
				<div class="other-users animated" v-show='rotateY' @mouseenter="rotate" @mouseleave="rotate">
					<div class="top clearfix">
						<div><span @click="!concerns && toggle()" :class=[{active:concerns}]>关注</span></div>
						<div><span @click="!fans && toggle()" :class=[{active:fans}]>粉丝</span></div>
					</div>
					<ul class="other-list"  >
						<li class="user clearfix" v-for='(item,index) in otherUsers'>
							<div class="avatar">
								<img :src="item.image"/>
							</div>
							<div class="detail">
								<div class="name">{{item.name}}</div>
								<div class="desc">{{item.desc}}</div>
							</div>
							<div class="statue" v-if="concerns">关注</div>	
						</li>
						
					</ul>
				</div>
			</transition>
		</div>	
	</transition>
</template>

<script>
	export default{
		data(){
		  	return{
		  		name:'',
	  			desc:'',
	  			rotateY: false,
	  			url: 'blogger/'+ window.location.pathname.split('/')[1] + '/about',
	  			image: '',
	  			otherUsers:[],
	  			img:'../../../static/img/hRdRxnHyjxU.jpg',
	  			concerns: true,
				fans: false,
				isEntered: false,
				userType: 'fans',
		  	}
		},
		methods:{
			rotate(){
				this.rotateY = !this.rotateY;
			},
			sendConcern(){
				this.$http
					.post('blogger/otherUsers',{
						concern: window.location.pathname.split('/')[1],
						user: this.$store.state.userInfo._id,
					})
					.then(function(res){
						console.log(res)
					})
			},
			toggle(){
				this.concerns = !this.concerns;
				this.fans = !this.fans;
				if(this.concerns){
					this.userType = 'concerns';
					this.otherUsers = [];
					this.$http
						.get('blogger/'+ window.location.pathname.split('/')[1] + '/otherUsers?userType='+this.userType)
						.then( res => {
							res.data.userType[this.userType].forEach((item,index) => {
								item.image = 'data:image/png;base64,'+item.image
							});
							this.otherUsers = res.data.userType[this.userType]
						})
				}else if(this.fans){
					this.userType = 'fans';
					this.otherUsers = [];
					this.$http
						.get('blogger/'+ window.location.pathname.split('/')[1] + '/otherUsers?userType='+this.userType)
						.then( res => {
							res.data.userType[this.userType].forEach((item,index) => {
								item.image = 'data:image/png;base64,'+item.image
							});
							this.otherUsers = res.data.userType[this.userType]
						})
				}
			},
		},
		created(){
			
			this.$http.get(this.url)
			.then(res => {
				this.name = res.data.name;
				this.desc = res.data.desc;
				this.image = 'data:image/png;base64,' + res.data.image;
			});
			
			this.$http
				.get('blogger/'+ window.location.pathname.split('/')[1] + '/otherUsers?userType='+this.userType)
				.then( res => {
					res.data.userType.fans.forEach((item,index) => {
						item.image = 'data:image/png;base64,'+item.image
					});
					this.otherUsers = res.data.userType.concerns
				})
			
		},
		
	}
</script>

<style scoped lang='scss'>
	.rotate{
		transform: rotateY(-180deg);
		background-color: #000;
	}
	.my-img{
		
		.concern{
			position: absolute;
			top: 50%;
			margin-top: -15px;
			left: 50%;
			transform: translateX(-50%) rotateY(180deg);
			width: 60px;
			height: 30px;
			line-height: 30px;
			border-radius: 10px;
			text-align: center;
			cursor: pointer;
			font-size: 12px;
			color: #fff;
			background-color: lightskyblue;
			
		}
		.hidden{
			visibility: hidden;
		}
	}
	.other-users{
		position: absolute;
		width: 320px;
		left: 160px;
		top: -80px;
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		.top{
            width: 40%;
            padding: 10px 0;
            margin: 0 auto;
            background-color: #fff;
            .active{
				color: lightblue;
			}
            div{
                width: 50%;
                float: left;
                font-size: 18px;
                color: #646448;
                text-align: center;
                span{
                    cursor: pointer;
                    position: relative;
                    &:after{
                        content: " ";
                        position: absolute;
                        width: 100%;
                        height: 1.5px;
                        bottom: 0;
                        left: 0;
                        background-color: #42B983;
                        visibility: hidden;
                        transform:scaleX(0);
                        transform-origin:50% 50%;
                        transition-duration: 0.2s;
                        transition-timing-function: ease-in-out;
                        transition-delay: 0s;     
                    }
                    &:hover{
                        &:after{
                            visibility: visible;
                            transform:scaleX(1);
                        } 
                    }
                }
            }
        }
		.other-list{
			height: 315px;
			overflow: hidden;
			overflow-y: auto;			
			padding: 0 10px;
			background-color: #fff;
			cursor: pointer;
			.user{
				position: relative;
				height: 60px;
				.avatar{
					float: left;
					width: 30px;
					height: 30px;
					margin: 15px 0;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.detail{
					float: left;
					width: 60%;
					margin-left: 10px;
					padding-top: 10px;
					font-size: 13px;
					.name{
						color: #000;
						
					}
					.name,.desc{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.statue{
					position: absolute;
					top: 50%;
					margin-top: -15px;
					right: 0;
					width: 60px;
					height: 30px;
					line-height: 30px;
					border-radius: 10px;
					text-align: center;
					cursor: pointer;
					font-size: 12px;
					color: #fff;
					background-color: lightskyblue;
				}
			}
		}
	}
</style>