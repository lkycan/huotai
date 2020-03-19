

var app = angular.module('myApp', []);
app.controller('sloganCtrl',function($scope,$timeout){

//搜索
$scope.rechargeSearch=function(){
    var attr = { 
        "obj": "admin",
        "act": "slogan_read"
    } 
    server.publicMethod(attr,function(data){

        $timeout(function () {
            $scope.in=data.in;
            $scope.out=data.out
        },1);

    });
};
/*保存
* */
    $scope.save=function () {
        var attr = {
            "obj": "admin",
            "act": "slogan_edit",
            "in":$scope.in,
            "out":$scope.out
        }
        server.publicMethod(attr,function(data){
         alert(data.info);
            $scope.rechargeSearch();
        });
    }





});
