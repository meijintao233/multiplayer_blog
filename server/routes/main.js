//loading module 'express'
var express = require('express');
//路由中间件
var router = express.Router();
//loading module 'mongoose'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

////
//categorySchema = new mongoose.Schema({
//	//
//	name:String,
//});

//账户密码
var accountSchema = new Schema({
		_user:{
			type: ObjectId,
			ref: 'User'
		},
		_account:{
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,//可要可不要，前端已经验证过
		}
	});

//个人信息
var userInfoSchema = new Schema({
		_user: {
	    	type: ObjectId,
	        ref: 'User',
	    },
	    name: {
	    	type: String,
	    	required: true,
	    	unique: true,
	    },
	    desc: {
	    	type: String,
	    },
	    fans:[{
	    	type:ObjectId,
	    	ref: 'UserInfo',
	    }],
	    concerns:[{
	    	type:ObjectId,
	    	ref: 'UserInfo',
	    }],
	    image: String,//暂时用string
	});

//文章
var articalSchema = new Schema({
		
//		//
//		category:{
//		/*	type: mongoose.Schema.Types.ObjectId,
//			ref: 'Category',	*/
//			type:String
//		},
		//
//		briefIntro:{
//			type: String,
//			default: ''	
//		},


		//文章题目
		title: {
			type: String,
	    	required: true,
		},
		
		//内容
		content:{
			type: String,
			required: true,
		},
	
		//作者
		author:{
	    	type: ObjectId,
	        ref: 'User',
	    },
	 
	    //发布时间
	    time:{
	    	type: Date,
	    	default: Date.now(),
	    },
	    
	    //阅读量
	    views:{
	    	type: Number,
	    	default: 0,
	    },
		
		//评论
		_comment: [{
	        type: ObjectId,
	        ref: 'Comment'
		}],
	});

//评论
var commentSchema = new Schema({
		
		_user:{
			type: ObjectId,		
			ref: 'UserInfo',
		},
		_artical:{
			type: ObjectId,
			ref: 'Artical',
		},
		content:{
			type: String,
			required: true,
		},
		time:{
			type: Date,
			default: Date.now(),
		},
		like:{
			type: Number,
			default: 0,
		},
		comments:{
			type: ObjectId,
			ref: 'Comment',
		}
	});

//用户
var	userSchema = new Schema({
		_account:{
			type: ObjectId,		
			ref: 'Account',
		},
		_userInfo:{
			type: ObjectId,
			ref: 'UserInfo',
		},
		_artical:[{
			type: ObjectId,
			ref: 'Artical',
		}],
		
	});



//var Category = mongoose.model('Category', categorySchema);

//创建模型
var User = mongoose.model('User', userSchema);
var Artical = mongoose.model('Artical',articalSchema);
var Comment = mongoose.model('Comment',commentSchema);
var UserInfo = mongoose.model('UserInfo',userInfoSchema);
var Account = mongoose.model('Account',accountSchema);


var resInfo;
var userInfo;

router.use((req,res,next) => {
	resInfo = {
		condition: 0,
		message: '',
		user:{},
	}
	next();	
})

/*
//0是，1不是
router.use((req,res,next) => {
	if(req.user == null || !req.user.isHost){
		resInfo.condition = 1;
		resInfo.message = 'you are not blogger';
		res.json(resInfo);
		return;
	}
	next();
});

//index
router.get('/index',(req,res,next)=>{
	resInfo.condition = 0;
    resInfo.message = 'welcome,blogger!'
    resInfo.user = req.user;
    res.json(resInfo);
});

*/
/*
router.post('/comfirm',(req,res,next) => {
	var _id = req.body._id;
	User.findOne({
		_id:_id,
	}).then((user) => {
		if(user){
			res.json(true);
			return ;
		}
	}).catch(()=>{
		res.json(false);
		return;
	})
})*/

var res_info = {
	state: '',
	message: '',
}

//前端提交用户信息
router.post('/userInfo',(req,res,next)=>{
	var id = req.body.id;
	var name = req.body.name;
	var desc = req.body.desc;
	var image = req.body.img;
	
	UserInfo.findOne({
		'name': name,
	}).then((userInfo) =>{
		if(userInfo){
			res.json();
			return;
		} else {
			new UserInfo({
				'name': name,
				'desc': desc,
				'image': image,
			}).save().then((userInfo)=>{
				console.log(id)
				User.findOne({'_id':id}).then(function(user){
					userInfo._user = user;
					user._userInfo = userInfo;
					user.save();
					userInfo.save();
					res.json()
				})
			});
		}
	})
})

//前端提交注册
router.post('/register',(req,res,next) => {
	var _account = req.body.account;
	var password = req.body.password;
	
	//查询账号是否存在
	Account.findOne({
		'_account': _account,
	}).then((account) =>{
		console.log(account)
		if(account){
            return;
		} else {
			//创建账号
			var account = new Account({
	            '_account': _account,
	            'password': password,
	        });
	        //保存到数据库中
	        return account.save().then(function(account){
	        	//创建一个用户文档
	        	
	        	new User({
	        		'_account': account,
	        	}).save().then(function(user){
	        		
	        		account._user = user;
					account.save();
		        	resInfo.user = {
		        		'_id': user._id,
			            'account': account._account,
					}    
					console.log(resInfo)
			    	res.json(resInfo);
	        	})
	        })   	
		}
	})
})

//前端提交登陆
router.post('/login',(req, res, next) => {
    var _account = req.body.account;
	var password = req.body.password;
    Account.findOne({'_account':_account,'password':password}).then((account) => {
    	console.log(account)
    	
        if (!account) {
            
            return;
        } else {
	        resInfo.user = {
	            _id: account._user,
	            account: account._account,
	            password: account.password,
	        }    
	    	res.json(resInfo);
		    return;
        }
    })	
})

//暂时不处理退出的情况
router.get('/logoff', function (req, res, next) {
    req.cookies.set('user', null);
    resInfo.message = 'log off';
    res.json(resInfo);
})


//关于我的页面请求(根据id返回页面信息)
router.get('/:user/about',(req,res,next) => {
	var id = req.params.user;
	UserInfo.findOne({
		'_user':id,
	}).then((userInfo) => {
		
		if(userInfo){	
			res.json({
				name: userInfo.name,
				desc: userInfo.desc,
				image: userInfo.image,
			})
		}
	})
})

//前端文章请求
router.get('/:user/load', (req, res, next) => {
	var id = req.params.user;
	
	Artical
	.count({'author': id})
	.then((total) => {
		
	   	var current = Number(req.query.page || 1);//当前页
	   	
	    var pageSize = 5;//每页的数目
	  
	    var pages = Math.ceil(total / pageSize);//页数
	 
        var skip = (current - 1) * pageSize;
     
        Artical
        	.find({'author': id})
        	.sort({_id: -1})
        	.limit(pageSize)
        	.skip(skip)
        	.then(function (articals) {
        		console.log(articals)
	            res.json({
	                user: req.resInfo,
	                articals:articals,
	                page: current,
	                pages: pages,
	                total: total,
	                pageSize: pageSize,
	                flag:true,
	            });
	        });
		})
	.catch(()=>{
		res.json({
			flag:false,
		});
	})	
});

//前端提交文章
router.post('/:user/add',(req,res,next)=>{
	var id = req.params.user;
	new Artical({
		title: req.body.title,
        content: req.body.content,
        //      category: req.body.category,
		//      briefIntro: req.body.briefIntro,
    }).save().then(function(artical){
    	User.findOne({'_id': id}).then(function(user){
    		user._artical.push(artical);
    		artical.author = user;
    		artical.save();
    		user.save();
    		res.json();
    	});
    });
});

//前端请求编辑文章
router.get('/edit',(req,res,next)=>{
	var id = req.query.s||'';
	Artical
	.findOne({'_id': id})
	.then((artical)=>{
		if(!artical){
//			resData.condition = 1;
//          resData.message = '文章不存在';
//          res.json(resData);
            return Promise.reject();
		} else {
//			Artical.find().sort({_id: -1}).then(() => {
                res.json({ 
                    userInfo: req.userInfo,
                    //category: category,
                    content: artical,
                })
//          })
		}
	})
});


//前端提交编辑
router.post('/edit', (req, res, next) => {
    var id = req.body.s;
    // 更新文章
    Artical
	    .updateOne({'_id': id,},{
	        title: req.body.title,
	//      category: req.body.category,
	//      briefIntro: req.body.briefIntro,
	        content: req.body.content,
	    })
	    .then(function(){
	        resInfo.condition = 0;
	        resInfo.message = '文章修改成功';
	        res.json(resInfo);
	    })	
});

//前端请求删除文章
router.get('/delete', (req, res, next) => {
    // 获取要删除分类的id
    var id = req.query.s;
    Artical.remove({
        '_id': id,
    }).then(function(){
    	
    });
})

//前端请求看文章
router.get('/:user/text',(req,res,next)=>{
	var author = req.params.user;
	var id = req.query.s;
	Artical
		.find({'author': author})
		.sort({_id: -1})
		.then((artical) => {
			
	        res.json({ 
	            userInfo: req.userInfo,
	            //category: category,
	            content: artical[id],
	        })
    })
		
});

//前端获取评论
router.get('/:user/comment',function(req,res,next){
	var author = req.params.user;//文章作者
	var id = req.query.id;//文章编号
	console.log(id)
	Artical
	.find({'author':author})
	.populate({path:'_comment'})
	.sort({'_id':-1})
	.then(function(articals){
		Artical.populate(articals[id],{
			path:'_comment._user',
			select:'name',
			model:'UserInfo',
		},function(err,populatedArt){
			console.log(populatedArt)
			res.json({
				'comment': populatedArt,
			});
		})
	})
	
});


//前端提交评论
router.post('/:user/comment',function(req,res,next){
	var author = req.params.user;//文章作者
	var id = req.body.id;//文章编号
	var content = req.body.content;//评论内容
	var msger = req.body.msger;//评论人
	Artical
	.find({'author':author})
	.sort({'_id':-1})
	.then(function(articals){
		if(articals){
			UserInfo.findOne({'_user':msger}).then(function(userInfo){
				
				new Comment({
					'content': content,
					'_user': userInfo._id,
					'_artical': articals[id]._id,
				}).save().then(function(comment){
					articals[id]._comment.push(comment)	
					articals[id].save();
					Comment.findOne({'_id':comment._id})
					.populate({path:'_user',select:'name'})
					.then(function(comment){
						
						res.json({
							'comment': comment,
						});
					})

				})
			})
		}
	})
	
})


//前端发起查看粉丝
router.get('/:user/otherUsers',function(req,res,next){
	var blogger = req.params.user;
	var userType = req.query.userType;//关注or粉丝
	console.log(blogger)
	UserInfo
		.findOne({'_user':blogger})
		.populate({path:userType})
		.then(function(userInfo){

			res.json({
				userType: userInfo,
			})
		})
})


//前端发起关注粉丝请求
router.post('/otherUsers',function(req,res,next){
	var blogger = req.body.user;
	var concerned = req.body.concern;
	
	UserInfo
		.findOne({'_user':blogger})
		.then(function(userInfo){
			UserInfo.findOne({
				'$and':[{'_user':concerned},{'fans':[userInfo._id]}],
			}).then(function(userConcerned){
				if(userConcerned){
					
					return;
				} else{
					userInfo.concerns.push(userConcerned);
					userInfo.save();
					userConcerned.fans.push(userInfo);
					userConcerned.save();
				}
			})
			res.json()
		})
})



module.exports = router;

