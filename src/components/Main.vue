<template>
	<ul class="main">
		<li v-for="(item,index) in select(tableData)">
			<router-link :to="{'name': 'text', 'query':{'s': index}}">
				<div class="info-top">
					<p>{{item.title}}</p>
					<div class="info-top-bottom">
						<div class="time">
							<i class='el-icon-date'></i>&nbsp;发表于&nbsp;<span>{{item.time}}</span>
						</div>
						<div class="watch-person">
							<i class='el-icon-view'></i>&nbsp;阅读次数&nbsp;<span>100000</span>
						</div>
					</div>
				</div>
				<div class="info-bottom">
					<p>{{item.content}}</p>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script>
  export default {
  	data() {
	    return {
	    	url: '',
	    	tableData:[],
	    };
    },
   	
    methods: {
    	select(s){
    		var count = 0;
			return s.filter(() => {
				count++;
				return count<4;
			});
		},
		request(){
			if(this.$store.state.userInfo){
				this.url =  'blogger/'+ this.$route.params.user + '/load?page=';
			}else{
				this.url =  'blogger/'+ this.$route.params.user + '/load?page=';
			}
		},
	   	getData(){
	    	this.$http.get(this.url + this.page)
	    	.then(res => {
				if(res.data.flag){
					
		    		res.data.articals.forEach((artical) => {
	            		artical.time = this.normalizeDate(artical.time,false);
	         		});
			    	this.tableData = res.data.articals;
			    } else {
			    	/*this.$router.push({
			    		path:'/error'
			    	})*/
			    }
	    	})	
	    	
	    },
	    handleCurrentChange(val) {
	      	this.page = `${val}`;
	      	console.log(this.url + this.page);
	        this.getData(this.url,this.page);  
	    }
	},
	created(){
		this.request();
		console.log(this.url)
		this.getData();
		
	},
	
    
  }
</script>

<style lang="scss" scoped>

	.main{
        min-width: 1000px;
        li{
            padding: 20px;
            margin: 20px;
            border-radius: 10px;
            box-shadow:4px 4px 4px #efefef, 
                        -4px -4px 4px #efefef, 
                        4px -4px 4px #efefef, 
                        -4px 4px 4px #efefef;
            &:hover{
                transform: scale(1.01,1.01);
                box-shadow:4px 4px 4px #c9e1f6, 
                            -4px -4px 4px #c9e1f6, 
                            4px -4px 4px #c9e1f6, 
                            -4px 4px 4px #c9e1f6;
            }
            .info-top{
                p{
                    display: inline-block;
                    position: relative;
                    font-size: 20px;
                    color: #555; 
                    &:after{
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        bottom: 0;
                        left: 0;
                        background-color: #000;
                        visibility: hidden;
                        transform: scale(0);
                        transform-origin: 50% 0;
                        transition: all .3s ease-in-out 0s;
                    }
                    &:hover{
                        &:after{
                            visibility: visible;
                            transform: scale(1);
                        } 
                    }
                      
                }
                .info-top-bottom{
                    display: flex;
                    color: #999;
                    font-size: 13px;
                    margin: 10px 0;
                    text-align: center;
                    .time{
                       padding-right: 20px; 
                    }
                    .watch-person{
                        padding-left: 20px;
                        border-left: 1px solid #D4D4D4; 
                    }
                }
            } 
            .info-bottom{
                text-align: justify;
                font-size: 15px;
                p{
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;   
                }
            }   
        }
    }
</style>