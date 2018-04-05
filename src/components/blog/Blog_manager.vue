<template>
	<div class="manager">

	  <el-table
	    :data="tableData"
	    border
	    style="width: 85%;"
	    class='table'>
	    <el-table-column
	      fixed
	      prop="_id"
	      label="ID"
	    >
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="文章标题"
	    >
	    </el-table-column>
	    <el-table-column
	      prop="category"
	      label="分类"
	    >
	    </el-table-column>
	    <el-table-column
	      prop="time"
	      label="发布时间"
	    >
	    </el-table-column>
	    <el-table-column
	      prop="views"
	      label="阅读次数"
	    >
	    </el-table-column>    
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="150">
	      <template slot-scope="scope">
	        <el-button  size="small" type="primary" round>
	        	<router-link :to="{'name': 'edit', 'query':{'s': scope.row._id}}">编辑</router-link>
	        </el-button>
	        <el-button  @click="deleteArtical(scope.row._id)" size="small" type="danger" round>删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
  
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
        tableData: [],
        url: 'blogger/'+ this.$store.state.userInfo._id + '/load?page=',
        currentPage: 0,
        total: 0,
        pageSize: 0,
        page: 1,
        pages: '',
        
      }
    },
    
    methods: {
	    deleteArtical(id) {
	        this.$http.get('blogger/delete?s=' + id)
	        .then(res=>{
	        	this.$message({
		            message: res.data.message,
		            type: 'success'
		        });
		        
		    })
	        .catch(res => {
		        console.log('error:' + res);
		    })
	        ths.tableData.splice(id,1)
	    },
	    getData(){
	    	this.$http.get(this.url+this.page)
	    	.then(res => {
	    		console.log(res)
    			this.total = res.data.total;
	    		this.pageSize = res.data.pageSize;
	    		this.page = res.data.page;
	    		this.pages = res.data.pages;
	    		res.data.articals.forEach((artical) => {
	            	artical.time = this.normalizeDate(artical.time,true);
	         	});
	    		this.tableData = res.data.articals;  
	    	})	
	    },
        handleCurrentChange(val) {
      	 	this.page = `${val}`;
         	this.getData(this.url,this.page);  
        },
    },
    created(){
    	this.getData();
    },
    
  }
</script>

<style scoped>
	.table{
		margin: 0 auto;
		margin-top: 50px;
		height: 397px;	
	}
	.pagination{
		text-align: center;
		margin-top: 40px;
	}
</style>