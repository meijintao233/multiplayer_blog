


import Index from '@/components/Index'

import Home from '@/components/Home'
import Articals from '@/components/Articals'
import About from '@/components/About'
import Register_login from '@/components/Register_login'

import Text from '@/components/Text'

import Main from '@/components/Main'
import Blog_list from '@/components/blog/Blog_list'


import Blogger from '@/components/Blogger'
import Detail from '@/components/Detail'
import Blog_add from '@/components/blog/Blog_add'
import Blog_manager from '@/components/blog/Blog_manager'
import Blog_edit from '@/components/blog/Blog_edit'

import Comment from '@/components/Comments'

import Error from '@/components/Error'
import Datepicker from '@/components/common/Datepicker'



export default {
  routes:[	
  	{
  		path:'/',
  		name:'index',
  		component:Index,
  		children:[
  			{
		      path: '/:user/home',
		      name: 'home',
		      meta:{
    				 needConfirm:true,
    			},
		      components: {
		      	hello: Home,
		      	main:Main,
		      }
		    },
		    {
		      path: '/:user/articals',
		      name: 'articals',
		      meta:{
    				 needConfirm:true,
    			},
		      components: {
		      	hello: Articals,
		      	main:Blog_list,
		      }
		    },
		    {
		      path: '/:user/about',
		      name: 'about',
		      meta:{
    				 needConfirm:true,
    			},
		      components: {
		      	hello: About,
		      }
		    }, 
		      
  		],	
  	},
  	{
    	path:'/:user/blogger',
    	name:'blogger',
    	component:Blogger,
    	children:[
    		{
    			path:'/:user/blogger',
    			name:'regester_login',
    			meta:{
    				 allowBack:false,
    			},
    			components:{
    				blog: Register_login,
    			}
    		},
    		{
    			path:'/:user/blogger/detail',
    			name:'detail',
    			components:{
    				blog: Detail,
    			}
    		},
    		{
    			path:'/:user/blogger/add',
    			name:'add',
    			meta:{
    				 needLogin: true,
    			},
    			components:{
    				blog:Blog_add,
    			}
    		},
    		{
    			path:'/:user/blogger/manager',
    			name:'manager',
    			meta:{
    				needLogin: true,
    			},
    			components:{
    				blog:Blog_manager,
    			},
    		},
    		{
    			path:'/:user/blogger/edit',
    			name:'edit',
    			meta:{
    				needLogin: true,
    			},
    			components:{
    				blog:Blog_edit,
    			}
    		},
    		{
		      path: '/:user/blogger/text',
		      name: 'text',
		      components: {
		      	blog: Text,	
		      }
		    },
    	]
	  },
	  {
	  	path:'/error',
	  	name:'error',
	  	component:Error,	
	  },
	  {
	  	path:'/date',
	  	name:'date',
	  	component:Datepicker,	
	  },
	  {
	  	path:'*',
	  	redirect:{
	  		name:"error",
	  	}
	  }
  	
 	
  ],
  mode:'history',
  
}
