/*var app = angular.module('myApp', []);

require(src="js/server.js");
app.controller('formCtrl',function($scope){*/
//登录按钮。上传到服务器
var loginlogin=function() {

	

/* var attr = {
            "ctype": "admin",
            "login_name": $scope.login_name,
            "login_passwd":$scope.login_passwd
        }
       
login(attr);*/
 /*  server.login($scope.login_name, $scope.login_passwd, function(data) {

   	console.log(data);
   	 	console.log("data");
   });*/

   var login_name = document.getElementById("login_name").value;
    var login_passwd = document.getElementById("login_passwd").value;
      server.login(login_name, login_passwd, function (data) {
                GameObj.login = data;
                if (data.ustr != undefined && data.ustr != "") {

                } else {
                     window.location.href='index.html';
                }})


}
// });
