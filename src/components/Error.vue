<template>
	<div class="error">
		404
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		beforeRouteLeave(to,from,next){
        	if(!this.$store.state.userInfo&&to.matched.some(r => r.meta.needLogin)){
        		
				this.$router.go(-1);
			}	
        }
	   
	}
</script>

<style scoped lang="scss">
	.error{
		font-size: 40px;
	} 
</style>