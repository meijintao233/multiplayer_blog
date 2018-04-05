<template>
	<div>
		
	
		<ul class="main">
	
			<li v-for="(item,index) in tableData">
				<router-link :to="{'name': 'text', 'query':{'s': index+5*(currentPage-1)}}">
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
	    <div class="pagination">
		    <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="pageSize"
		      layout="total,prev, pager, next, jumper"
		      :total="total"
		      class='page'>
		    </el-pagination>
	    </div>
    </div>
</template>

<script>
  export default {
  	data() {
	    return {
	    	url: 'http://localhost:8081/blogger/'+ this.$route.params.user+ '/load?page=',
	    	tableData:[],
	        currentPage: 1,
	        total: 1,
	        pageSize: 1,
	        page: '',
	        pages: '',
	        isLeave: false,
	    };
    },
   
    methods: {
    	getData(){
	    	this.$http.get(this.url + this.page)
	    	.then(res => {
    			this.total = res.data.total ;
	    		this.pageSize = res.data.pageSize;
	    		this.page = res.data.page;
	    		this.pages = res.data.pages;
	    		res.data.articals.forEach((artical) => {
            		artical.time = this.normalizeDate(artical.time,false);
         		});
		    	
		    	this.tableData = res.data.articals;
	    	})	
	    },
	    handleCurrentChange(val) {
	      	this.page = `${val}`;
	      	//console.log(this.url + this.page);
	        this.getData(this.url,this.page);  
	    }
	},
	created(){
		this.getData();
	},
	transition:{
		
		afterLeave() {
        	this.isLeave = true;
        },
	},	
//	beforeRouteLeave(to,from,next){
//		console.log(1)
//		if(this.isLeave){
//			next();
//		}
//	}
    
  }
</script>

<style scoped lang="scss">
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
                box-shadow:4px 4px 20px #c9e1f6, 
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
                    cursor: pointer;  
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
                        transition: all .2s ease-in-out;
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
	
	.page{
		margin: 30px 0;
		text-align: center;
	}
</style>