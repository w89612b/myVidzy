var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myExpress' });
  /*
  render：用来渲染视图
	send：用来发送文本内容到客户端
	json：发送json对象到客户端
	redirect：重定向客户端到另一个地址
   * */
});

module.exports = router;
