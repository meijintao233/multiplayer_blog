<template>
	<div class="wrap">
	  	<div id="app">
			<router-view></router-view>
  		</div>
	</div>  
</template>

<script>

import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'

export default {
	
  name: 'app',
  
  data(){
  	return{
  			
  	}
  	
  },
 
  created() {
     // console.log(this.get_userInfo)
  }
}
</script>

<style lang="scss">
	@import "./assets/css/main.css";
	@import "./assets/css/_common.scss";
    @import "./assets/css/animate.css";
	@import "./assets/css/font_1/iconfont.css";
</style>
