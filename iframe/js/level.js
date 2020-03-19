var app = angular.module('myApp', []);
app.controller('levelCtrl', function ($scope, $timeout) {
    $scope.packageShow1 = false;
    $scope.page_num1 = 0;
    $scope.numShow = true;
    $scope.dayShow = false;
    var page_num11 = 0;
    var page_all11 = 0;
    var cpt = "charge_by_num";
    $scope.addType = '';
    $scope.modifyItem= '';
    var type = 0; //0为次卡，1为时卡
    //查询列表
    $scope.names = "";
    //拉取套餐列表。
    window.onload = function () {
        util.init(function () {
            /*查询列表  暂时隐藏*/
            pack_list();
            console.log(6666);

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

    $scope.showAdd = function (type,item) {
        console.log('type is ' + type)
        $scope.addType = type;
        console.log(item)
        $scope.modifyItem = item;
        // console.log($scope.addModel)
        $('#myModal').modal('show');
        
    }

    $scope.levelAdd = function () {
        console.log($scope.modifyItem)
        // 提交
    }

    // 修改
    $scope.modify = function (item) {
        console.log('modify')
        console.log(item)
        // 提交
        // modifyItem
        $scope.modifyItem = item;
        // $timeout(function () {
        //     $scope.modifyItem = item;
        // }, 1);     
        console.log($scope.modifyItem)
        
        // 打开修改弹层

    }



});
