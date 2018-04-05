<template>
	<div class='date-picker'  >
		<input type="text" readonly="readonly"  @click="show" v-model="riqi"/>
		
		<transition enter-active-class='zoomIn' leave-active-class='zoomOut'>
			<div class="date-content animated"  v-show="isShow" >
				<div class="action">
					<div class="double-arrow-left" @click="doubleArrowLeft"></div>
					<div class="arrow-left" @click="arrowLeft" :class="{'hide':!showDay}"></div>
					<span @click="showYears">{{!this.showYear? year + '年': start + '年-'+ end +'年'}}</span>
					<span @click="showMonths" :class="{'hide':!showDay}">{{month}}月</span>
					<div class="double-arrow-right" @click="doubleArrowRight"></div>
					<div class="arrow-right" @click="arrowRight" :class="{'hide':!showDay}"></div>
				</div>
				<div class="date-table">
					<ul class="clearfix" :class="{'hide':!showDay}">
						<li v-for="item in weeks" class="week">{{item}}</li>
					</ul>
					<ul class="clearfix" :class="{'hide':!showDay}" @click="getDay($event)">
						<li v-for="(item,index) in total" class="day" :class="[index>=month_date&&index<month_days+month_date?'available':'other',index-(month_date-1)==day?'current':'']">{{item}}</li>
					</ul>
					<ul class="clearfix" :class="{'hide':!showMonth}">
						<li v-for="item,index in month_ch" class="month" :class="index==month-1?'current':''" @click='getMonth(index)'>{{item}}月</li>
					</ul>
					<ul class="clearfix" :class="{'hide':!showYear}" >
						<li v-for="item,index in years" class="year" :class="item==year?'current':''" @click='getYear(item)'>{{item}}年</li>
					</ul>
				</div>
			</div>
		</transition>		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				month_ch:['一','二','三','四','五','六','七','八','九','十','十一','十二'],//中文月份数组
				weeks: ['日','一','二','三','四','五','六'],//周数组
				months: ['1','2','3','4','5','6','7','8','9','10','11','12'],//月份数组
				total:[],//天数页面数组（总天数）
				years:[],//年份数组
				year: new Date().getFullYear(),//今天所属年份
				month: new Date().getMonth() + 1,//今天所属月份
				day: new Date().getDate(),//今天日期
				month_date:'',//本月初星期几
				month_days:'',//本月天数
				showYear: false,//是否显示年份页面
				showMonth: false,//是否显示月份页面
				showDay: true,//是否显示天数页面
				start:0,//年份界面最小值
				end:0,//年份界面最大值
				isShow: false,//是否显示日历
				riqi:'',//日期显示
			}
		},
		methods:{
			getDate(){
				//关键在于new Date()获得天数以及星期几
				
				var month = this.month; //本月月份
				var pre_month = month - 1;//上月月份
				var year = this.year;//本年
				var month_days = new Date(year,month,0).getDate();//本月天数
				var pre_month = new Date(year,pre_month,0).getDate();//上月天数
				var month_date = new Date(year,month - 1,1).getDay()%7;//本月初星期几
				var next_month = (7 - new Date(year,month,1).getDay())%7;//下月初星期几
				this.month_date = month_date;
				this.month_days = month_days;
				//对接上月月末
				for(var i = 0;i < month_date;i++){
					this.total.unshift( pre_month - i );
				}
				//本月天数
				for (var i = 0;i< month_days;i++) {
					this.total.push(i + 1);
				}
				//对接本月末
				for (var i = 0;i < next_month;i++) {
					this.total.push(i + 1);
				}
			},
			arrowLeft(){
				--this.month;
				if(this.month){
					this.month = this.months[this.month-1];
				} else {
					if(this.month == 0){
						this.month = 12;
					}

					this.year--;
					this.month = this.months[this.month-1];
				}
				this.total = [];
				this.getDate();
			},
			arrowRight(){
				if(++this.month){
					
					this.year += (this.month-1)/12 | 0;
					this.month = this.months[(this.month-1)%12];
				}
				this.total = [];
				this.getDate();
			},
			doubleArrowLeft(){
				this.year--;
				this.total = [];
				this.getDate();
				if(this.showYear){
					this.years = [];
					this.year -= 9;
					this.start = ((this.year/10)|0)*10;
					this.end = this.start + 10;
					for (var i = this.start;i < this.end;i++) {
						this.years.push(i);
					}
				}
			},
			doubleArrowRight(){
				this.year++;
				this.total = [];
				this.getDate();
				if(this.showYear){
					this.years = [];
					this.year += 9;
					this.start = ((this.year/10)|0)*10;
					this.end = this.start + 10;
					for (var i = this.start;i < this.end;i++) {
						this.years.push(i);
					}
				}
			},
			showMonths(){
				this.showMonth = !this.showMonth;
				this.showDay = !this.showDay;
			},
			showYears(){
				this.showYear = true;
				this.showDay = false;
				this.showMonth = false;
				this.years = [];
				this.start = ((this.year/10)|0)*10;
				this.end = this.start + 10;
				for (var i = this.start;i < this.end;i++) {
					this.years.push(i);
				}
			},
			getMonth(index){
				this.month = index+1;
				this.showMonths();
			},
			getYear(item){
				this.year = item;
				this.showYear = false;
				this.showMonth = true;
				
			},
			show(){
				this.isShow = true;
			
			},
			hide(){
				this.isShow = false;
			},
			getDay(e){
				var target = e.target;
				var day = target.classList[1] == 'available'? target.innerText:this.day;
				var year = this.year;
				var month = (this.month + '').length < 2?'0'+this.month:this.month;
				day = day.length<2?'0'+day:day; 
				this.day = day;
				this.riqi = year + '-' + month + '-' + day;
				this.isShow = false;
			}
		},
		created(){
			this.getDate();
		},
		
		
		
	}
</script>

<style scoped lang='scss'>
	input{
		width: 200px;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		border: 1px solid #bfcbd9;
	}
	.date-picker{
		width: 600px;
		height: 800px;
		margin: 0 auto;
		
	}
	
	.available{
		font-size: #48576a;
		cursor: pointer;
		&:hover{
			background-color: #e4e8f1;
		}
	}
	.other{
		color: #ddd;
	}
	.current{
		background-color: #20a0ff;
		color: #fff;
	}
	.date-content{
		width: 200px;
		border: 1px solid #ccc;
		box-shadow: 5px 5px  #ccc;
		.action{
			margin: 10px;
			font-size: 14px;
			text-align: center;
			span{
				padding: 0 5px;
				&:hover{
					cursor: pointer;
					color: #20a0ff;
				}
			}
			.double-arrow-left{
				float: left;
				cursor: pointer;
				&:before{
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(135deg);
				}
				&:after{
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					margin-left: -5px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(135deg);
				}
			}
			.double-arrow-right{
				float: right;
				cursor: pointer;
				&:hover{
					border-color: #fff #fff;
				}
				&:before{
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(-45deg);
				}
				&:after{
	
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					margin-left: -5px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(-45deg);
				}
			}
			.arrow-left{
				margin-left: 5px;
				float: left;
				cursor: pointer;
				
				&:before{
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(135deg);
				}
			}
			.arrow-right{
				float: right;
				margin-right: 5px;
				cursor: pointer;
				&:before{
					display: inline-block;
					content: '';
					width: 8px;
					height: 8px;
					border-bottom: 2px solid #97a8be;
					border-right: 2px solid #97a8be;
					transform: rotate(-45deg);
				}
			}
		}
		.date-table{
			width: 100%;
			ul{
				padding: 5px;
				&>li{
					cursor: pointer;
					height: 30px;
					line-height: 30px;
					text-align: center;	
				}
				.week{
					float: left;
					width: 14.2%;
				}
				.day{
					float: left;
					width: 14.2%;
				}
				.month{
					float: left;
					width: 33.3%;
					cursor: pointer;
					&:hover{
						background-color: #e4e8f1;
					}
				}
				.year{
					float: left;
					width: 25%;
					cursor: pointer;
					&:hover{
						background-color: #e4e8f1;
					}
				}
			}
		}
	}
</style>