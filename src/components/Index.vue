<template>
	<div class="container" >
		<my-nav></my-nav> 
		<div class="bg-img" >
			<router-view name='hello'></router-view>
			<img src="../../static/img/6sb4utqAwsU.jpg"/>
		</div>
		<router-view name='main'></router-view>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import Nav from '@/components/common/Nav'
	import Footer from '@/components/common/Footer'
	export default{
		data(){
		  	return{
		  		
		  	}
		},
		components:{
		  	'my-nav':Nav,
			'my-footer':Footer,	
		},	
		created(){
			
		},
		
		watch: {
	        '$route' (to,from){
	        	
	        }
	   	},
	   	
	}
</script>

<style scoped lang="scss">
	
	
</style>