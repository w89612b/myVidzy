var express = require('express');
var router = express.Router();

//引用MongoDB读取模块
var monk = require('monk');
//连接数据
//当我们引入Monk的时候得到的是一个方法而不是对象。所以 monk 变量是一个我们通过调用来访问数据库的方法
var db = monk('localhost:27017/vidzy');

router.get('/',function (req,res) {
	/*
	 **首先我们调用 db 对象的 get 方法，传入集合的名称（video）。它将返回一个集合对象。这个集合对象提供了一个数字和一些方法来操作集合上的文档。
	 * inser,find,findOne,update,remove
	 * */
	var collection = db.get('videos');
	collection.find({},function (err,videos) {
		if(err) throw err;
		res.json(videos);
	});
});
router.post('/',function (req,res) {
	var collection = db.get('videos');
	collection.insert({
		title:req.body.title,
		genre:req.body.genre,
		description:req.body.description
	},function (err,video) {
		if(err) throw err;
		res.json(video);
	})
});
//注意这里有一个路由参数，在一个冒号后面声明(:id)。你可以访问这个参数值通过 req.params.id。
router.get('/:id',function (req,res) {
	var collection = db.get('videos');
	collection.findOne({_id:req.params.id},function (err,video) {
		if(err) throw err;
		res.json(video);
	});
});

router.put('/:id',function (req,res) {
	var collection = db.get('videos');
	collection.update({_id:req.params.id},{
		title:req.body.title,
		genre:req.body.genre,
		description:req.body.description
	},function (err,video) {
		if(err) throw err;
		res.json(video);
	});
});

router.delete('/:id',function (req,res) {
	var collection = db.get('videos');
	collection.remove({_id:req.params.id},function (err,video) {
		if(err) throw err;
		res.json(video);
	});
});

//module.exports 应该是模块中的最后一行
module.exports = router;
