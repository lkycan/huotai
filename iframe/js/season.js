var app = angular.module('myApp', []);
app.controller('seasonCtrl',function($scope,$timeout){

//查询列表
$scope.names="";
window.onload = function() {
	util.init(function() {
		/*查询列表*/
		var attr = {
			"obj": "admin",
			"act": "seasonlist",
		} 

		server.seasonlist(attr,function(data){

			$timeout(function(){

				$scope.names= data.info;
			},1);
		});   
	});  


}



$scope.newSeason=function() {
	$scope.newSeason1=true;
}
$scope.saveSeason=function(){
	if(null== $scope.seasonName){
		alert("季节名称为空");
		return;
	}
	if(null== $scope.seasonOrder){
		alert("排序为空");
		return;
	}
	var attr = {
		"obj": "admin",
		"act": "seasonadd",
		"name":$scope.seasonName,
		"order":$scope.seasonOrder
	}   
	server.saveSeason1(attr,function(data){
$scope.newSeason1=false;
$scope.seasonName="";
$scope.seasonOrder="";
/*查询列表*/
util.init(function() {
	/*查询列表*/
	var attr = {
		"obj": "admin",
		"act": "seasonlist",
	} 

	server.seasonlist(attr,function(data){

		$timeout(function(){
			console.log('执行$timeout回调');
			$scope.names= data.info;
		},1);
	});   
}); 
});

}


/*取消*/
$scope.cancelSeason=function(){
	$scope.newSeason1=false;
	$scope.seasonName="";
	$scope.seasonOrder="";
}

$scope.editSeason=function(x){
$scope.newSeason2=true;
$scope.seasonName=x.name;
$scope.id=x._id;
$scope.seasonOrder=x.order;
console.info(x);
}

$scope.esaveSeason=function(){

	if(null== $scope.seasonName){

		alert("季节名称为空");
		return;
	}
	if(null== $scope.seasonOrder){
		alert("排序为空");
		return;
	}
	var attr = {
		"obj": "admin",
		"act": "seasonmodify",
		"id":$scope.id,
		"name":$scope.seasonName,
		"order":$scope.seasonOrder
	}   
	server.saveSeason1(attr,function(data){
		console.log(data);
		$scope.newSeason2=false;
		$scope.seasonName="";
		$scope.seasonOrder="";
		/*查询列表*/
		util.init(function() {
			/*查询列表*/
			var attr = {
				"obj": "admin",
				"act": "seasonlist",
			} 
			server.seasonlist(attr,function(data){

				$timeout(function(){
					$scope.names= data.info;
				},1);
			});   
		}); 
	});

}

$scope.delSeason=function(x){
	var attr = {
		"obj": "admin",
		"act": "seasondel",
		"id":x._id,
	}   
	server.saveSeason1(attr,function(data){
		console.log(data);
		$scope.newSeason2=false;
		$scope.seasonName="";
		$scope.seasonOrder="";
		/*查询列表*/
		util.init(function() {
			/*查询列表*/
			var attr = {
				"obj": "admin",
				"act": "seasonlist",
			} 
			server.seasonlist(attr,function(data){

				$timeout(function(){
					$scope.names= data.info;
				},1);
			});   
		}); 
	});


}


/*取消*/
$scope.ecancelSeason=function(){
	$scope.newSeason2=false;
	$scope.seasonName="";
	$scope.seasonOrder="";
}

});
