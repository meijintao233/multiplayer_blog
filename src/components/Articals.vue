<template>
	<transition enter-active-class='lightSpeedIn' leave-active-class='lightSpeedOut' class='articals' >
		<p class="animated">{{msg}}</p>	
	</transition>
</template>

<script>
	export default{
		data(){
		  	return{
	  			msg:'Blog text!'
		  	}
		},
		
	}
</script>

<style scoped>
	
	
</style>