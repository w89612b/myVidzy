/*ngResource，用来调用RESTful APIs和ngRoute来管理路由*/
var app = angular.module('Vidzy',['ngResource','ngRoute']);
//路由配置器
app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
		.when('/',{templateUrl:'partials/home.html',controller:'HomeCtrl'})
		.when('/add-video',{templateUrl:'partials/video-form.html',controller:'AddVideoCtrl'})
		.when('/video/:id',{templateUrl:'partials/video-form.html',controller:'EditVideoCtrl'})
		.when('/video/delete/:id',{templateUrl:'partials/video-delete.html',controller:'DeleteVideoCtrl'})
		.otherwise({redirectTo:'/'});
}]);
//控制器
//angular内部控制器引用 都有前缀$
//列表展示控制器
app.controller('HomeCtrl',['$scope','$resource',function ($scope,$resource) {
	var Videos = $resource('/api/videos');
	Videos.query(function (videos) {
		$scope.videos = videos;
	});
}]);

//添加视频控制器
//$location用来改变浏览器地址栏的URL
app.controller('AddVideoCtrl',['$scope','$resource','$location',function ($scope,$resource,$location) {
	$scope.save = function () {
		var Videos = $resource('/api/videos');
		Videos.save($scope.video,function () {
			$location.path('/');
		})
	}
}]);


//视频编辑控制器
//$routeParams 用来访问路由参数
app.controller('EditVideoCtrl',['$scope','$resource','$location','$routeParams',function ($scope,$resource,$location,$routeParams) {
	//只有Angular的开发者才知道，在某些情况下，默认你不能用$resource服务发送HTTP PUT请求，你需要扩展它通过一个使用HTTP UPT的 update 方法。
	var Videos = $resource('/api/videos/:id',{id:"@_id"},{
			update:{method:"PUT"}
		});
	Videos.get({id:$routeParams.id},function (video) {
		$scope.video = video;
	});
	$scope.save = function () {
		Videos.update($scope.video,function () {
			$location.path('/');
		})
	}
}]);


//视频删除控制器
app.controller('DeleteVideoCtrl',['$scope','$resource','$location','$routeParams',
function ($scope,$resource,$location,$routeParams) {
	var Videos = $resource('/api/videos/:id');
    Videos.get({ id: $routeParams.id }, function(video){
        $scope.video = video;
    })
    $scope.delete = function(){
        Videos.delete({ id: $routeParams.id }, function(video){
            $location.path('/');
        });
    }
}])
