
//实例一个模块，用来专门管理所有的控制器
var Controllers = angular.module('Controllers',[]);

Controllers.controller('DemoController',['$scope',function($scope){
	console.log('启动了');
}]);

//今日一刻
Controllers.controller('NavController',['$scope',function($scope){
	$scope.navs = [
		{link: '#/today', text: '今日一刻', icon: 'icon-home'},
		{link: '#/older', text: '往期内容', icon: 'icon-file-empty'},
		{link: '#/author',text: '热门作者', icon: 'icon-pencil'},
		{link: '#/category',text:'栏目浏览', icon: 'icon-menu'},
		{link: '#/favourite',text: '我的喜欢', icon: 'icon-heart'},
		{link: '#/settings', text: '设置', icon: 'icon-cog'}
	];
}]);


Controllers.controller('TodayController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){
	//获取计算机时间
	var today = $filter('date')(new Date,'yyyy-MM-dd');
	

	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.loaded = false;
	$http({
		url:'./api/today.php',
		method:'get',
		params:{today:today}

	}).success(function(info){
		$rootScope.loaded = true;
		console.log(info);
		$scope.date = info.date;
		$scope.posts = info.posts;

	});

}])

Controllers.controller('OlderController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){

	$rootScope.title = '往期内容';
	$rootScope.index = 1;
	$rootScope.loaded = false;
	$http({
		url:'./api/older.php',
		method:'get',
		

	}).success(function(info){
		$rootScope.loaded = true;
		console.log(info);
		$scope.date = info.date;
		$scope.posts = info.posts;

	});

}])
Controllers.controller('AuthorController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){

	$rootScope.title = '热门作者';
	$rootScope.index = 2;
	$rootScope.loaded = false;

	$http({
		url:'./api/author.php',
	}).success(function(info){
		$rootScope.loaded = true;
		console.log(info);
		$scope.rec = info.rec;
		$scope.all = info.all;
	})

}])