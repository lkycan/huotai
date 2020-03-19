var app = angular.module('myApp', []);
app.controller('rechargeCtrl', function ($scope, $timeout) {
    $scope.packageShow1 = false;
    $scope.page_num1 = 0;
    $scope.numShow = true;
    $scope.dayShow = false;
    var page_num11 = 0;
    var page_all11 = 0;
    var cpt = "charge_by_num";
    var type = 0; //0为次卡，1为时卡
//查询列表
    $scope.names = "";
//拉取套餐列表。
    window.onload = function () {
        util.init(function () {
            /*查询列表  暂时隐藏*/
            pack_list();

        });
    };
    pack_list = function () {
        var attr = {
            "obj": "admin",
            "act": "pack_list",
        }
        server.publicMethod(attr, function (data) {

            $timeout(function () {
                cpt = data.cpt;
                if (type == 0) {
                    $scope.packList = data.pack_list;
                    $scope.cptName = "次卡套餐";
                    $scope.gift = "赠送次数";
                    $scope.labelCount = "次数";
                } else {
                    $scope.packList = data.day_list;
                    $scope.cptName = "天数套餐";
                    $scope.gift = "赠送天数";
                    $scope.labelCount = "天数";
                }
            }, 1);
        });

    }

    /*pack_list=function() {
            var attr = { 
                "obj": "admin",
                "act": "pack_list",
            } 
            server.publicMethod(attr,function(data){
                $timeout(function() {
                    console.log(data);
                    cpt=data.cpt;
                    $scope.packList=  data.pack_list;
                    $scope.dayList=data.day_list;
    
    if (cpt=="charge_by_num") {
        $scope.cptName="次卡套餐";
    $scope.gift="赠送次数";
        $scope.labelCount="次数";
    }else{
    $scope.cptName="时卡套餐"
    $scope.gift="赠送时长（小时）";
        $scope.labelCount="时长（小时）";
    }
                }, 10);
            }); 
    
    }*/
//新增时卡切换
// 	$scope.changeCpt=function(){
// 	if($scope.numShow==true){
// 		$scope.numShow=false;
// 		$scope.dayShow=true;
// 	}else {
// 		$scope.numShow=true;
// 		$scope.dayShow=false;
// 	}
//
// 	}
    $scope.changeCpt = function () {
        if (type == 0) {
            type = 1;
        } else {
            type = 0;
        }
        pack_list();
    }


//次数新增页面弹出
    $scope.newNumPackage = function () {
        $scope.packageShow1 = true;
        $scope.newRecharge = true;
    }
//修改页面弹出
    $scope.editNumPackage = function () {

        if ($scope.x == undefined) {
            alert("请先选中一笔数据");
            return;
        }
        $scope.packageShow1 = true;
        var v = JSON.parse($scope.x);
        $scope.count = v.count;
        $scope.fee = v.fee;
        $scope.pack_id = v._id;
        $scope.gift_count = v.gift_count;
        $scope.editRecharge = true;
    }
//删除页面弹出
    $scope.delNumPackage = function () {
        console.log($scope.x);
        if ($scope.x == undefined) {
            alert("请先选中一笔数据");
            return;
        }
        var v = JSON.parse($scope.x);

        var attr = {
            "obj": "admin",
            "act": "pack_del",
            "pack_id": v._id
        }

        server.publicMethod(attr, function (data) {
            pack_list();
        });


    }


    /*搜索用户*/
    var user_id = "";
    $scope.rechargeSearch = function () {
        var attr = {
            "obj": "admin",
            "act": "person_get",
            "user_no": $scope.phone
        }
        server.publicMethod(attr, function (data) {
            $timeout(function () {
                if (data.info == "no user.") {
                    alert("查无该用户！");
                    return;
                }
                $scope.phone1 = data.user_info.phone_num;
                $scope.display_name = data.user_info.display_name;
                $scope.charge_by_num = data.num;
                $scope.charge_by_time = data.day;
                $scope.count_sum = data.count_sum;
                user_id = data.user_info._id;
            }, 1);
        });

    };
    /*充值*/
    $scope.recharge = function () {
        console.log($scope.x);
        if ($scope.x == undefined) {
            alert("请先选中一笔数据");
            return;
        }
        var v = JSON.parse($scope.x);
        var attr = {
            "obj": "admin",
            "act": "recharge",
            "user_id": user_id,
            "pack_id": v._id
        }
        server.publicMethod(attr, function (data) {
            console.log(data.is_recharge_success);
            if (data.is_recharge_success == 1) {
                alert("充值成功！");
                $scope.rechargeSearch();
            } else {
                alert("充值失败！");
            }


        });

    };

    /*扣除*/

    $scope.delcharge = function () {
        if($scope.num==undefined &&$scope.day==undefined ){
            alert("请填写要扣除的天数或次数！");
        }
        $scope.num= $scope.num==undefined?0:  $scope.num;
        $scope.day= $scope.day==undefined?0:  $scope.day;
        var attr = {
            "obj": "admin",
            "act": "balance_del",
            "user_id": user_id,
            "num": $scope.num,
            "day":$scope.day
        }
        server.publicMethod(attr, function (data) {
                if (data.is_del_success==1 ){
                    alert("扣除成功！")
                    $scope.rechargeSearch();}
                else{   alert("扣除失败！")}

        });

    }

    /*重置微信*/
    $scope.wechatDel = function () {
        var attr = {
            "obj": "admin",
            "act": "wechat_del",
            "user_id": user_id
        }
        server.publicMethod(attr, function (data) {
                alert(data.info)
            $scope.rechargeSearch();
        });


    }

});
