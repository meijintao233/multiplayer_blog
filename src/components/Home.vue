<template>
	
	<transition enter-active-class='zoomIn' leave-active-class='zoomOut' class='home' >
		<p class="animated">{{msg}}</p>	
	</transition>
</template>

<script>
	export default{
		data(){
		  	return{
	  			msg:'Welcome to the blog!'
		  	}
		},
		created(){
			
		},
		
	}
</script>

<style scoped>
	
	
</style>