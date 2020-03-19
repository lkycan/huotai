var app = angular.module('myApp', []);
app.controller('retrievePasswordCtrl', function ($scope, $timeout) {

    //根据手机号搜索
   $scope. retrievePasswordSeach=function () {


       var attr = {
           "obj": "admin",
           "act": "person_get",
           "user_no":$scope.phoneSearch
       }
       server.publicMethod(attr,function(data){
           $timeout(function() {
if (data.info=="no user.") {
	alert("查无该用户！");
	return;
}

               $scope.user_id=  data.user_info._id;
               $scope.phone1=data.user_info.phone_num;
               $scope.display_name=data.user_info.display_name;
               $scope.count_sum=data.count_sum;
               user_id=data.user_info._id;
           },1);
       });



   }

//修改
    $scope.save=function () {
        var attr = {
            "obj": "admin",
            "act": "reset_user_pw",
            "user_no": $scope.phone1,
            "modify_pw":  $scope.password1,
            "confirm_pw":  $scope.password2
        }

        server.publicMethod(attr,function(data){
            if(data.info!=undefined){
                alert(data.info);
            }else {
                alert(data.ustr);
            }
        });




    }


});
