<template>
	<div class="blogger">
		<my-nav></my-nav> 
		<router-view name='blog' ></router-view>		
		<my-footer></my-footer>
	</div>
</template>

<script>
	import Nav from '@/components/common/Nav'
	import Footer from '@/components/common/Footer'
	
	export default{
		data(){
		  	return{
	  			user:'',
		  	}
		},
		components:{
		  	'my-nav':Nav,
			'my-footer':Footer,	
		},
		watch: {
	        
	   },
	   
	   created(){
	   	
	   		this.user = this.$route.params.user;
	   		console.log(this.user)
	   }
	}
</script>
<style scoped lang='scss'>
	.blogger{
		margin: 80px 0;
	}
</style>