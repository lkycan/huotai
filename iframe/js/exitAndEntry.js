var app = angular.module('myApp', []);
app.controller('exitAndEntryCtrl', function ($scope, $timeout) {
    var orderlistid = "";
//查询列表
    $scope.showdiv1 = true;
    $scope.showdiv2 = false;
//初始化page_num
    $scope.page_num = 1;
    var page_num1 = 1;
    var page_all1 = 0;
//搜索
    $scope.rechargeSearch = function (page_num1) {
        $scope.page_num = page_num1;
        var time11 = document.getElementById("phonediv2").value;
        var time22 = document.getElementById("phonediv4").value;
        var time1 = " ";
        var time2 = " ";
        if (time11 != "") {
            time1 = getTimes(time11.split("-"));
        }

        if (time22 != "") {
            time2 = getTimes(time22.split("-"));
        }
        var phone = " ";
        if (undefined != $scope.phone && $scope.phone != "") {
            phone = $scope.phone;
        }
        //  charge_by_num/charge_by_time/空格' '     次卡/月卡/全部
        var attr = {
            "obj": "admin",
            "act": "entry_list",
            "start_time": time1,
            "end_time": time2,
            "page_no": page_num1,
            "user_no": phone,
            "charge_type": $scope.charge_type,
            "status":$scope.status

        }
        server.publicMethod(attr, function (data) {
            console.log(data);
            //出场操作
            $scope.operate = data.operate;
            $scope. number= data.number;
            $scope.sum_count = data.sum_count;
            page_all1 = data.all_record_num;
            $scope.count = data.all_record_num;
            $timeout(function () {
                for (var i = 0; i < data.list.length; i++) {
                    //状态
                    if (data.list[i].status == "finished") {
                        data.list[i].status = "已出场";
                    } else {
                        data.list[i].status = "未出场";
                    }
                    var et = data.list[i].et;
                    var leave = data.list[i].leave;
                    data.list[i].et = dateformat(et);
                    if (leave == 0) {
                        data.list[i].leave = "";
                    } else {
                        data.list[i].leave = dateformat(leave);
                    }

                    /*类型*/
                    if (data.list[i].ctype == "recharge") {
                        data.list[i].ctypestr = "充值"
                    } else {
                        data.list[i].ctypestr = "消费"
                    }

                    /*套餐类型*/
                    if (data.list[i].charge_type == "charge_by_num") {
                        data.list[i].pack_type = "次卡套餐";
                        data.list[i].count = data.list[i].count + "(次)"
                        if (data.list[i].balance_recount != null) {
                            data.list[i].balance_recount = data.list[i].balance_recount + "(次)"
                        }

                    } else {
                        data.list[i].pack_type = "天数卡套餐";
                        data.list[i].count = data.list[i].count + "(天)"
                        if (data.list[i].balance_recount != null) {
                            data.list[i].balance_recount = data.list[i].balance_recount + "(天)"
                        }
                    }
                }
                $scope.list = data.list;
            }, 1);
        });
    };

    function getTimes(data1) {
        var date = new Date();
        date.setFullYear(parseInt(data1[0]));
        date.setMonth(parseInt(data1[1]) - 1);
        date.setDate(parseInt(data1[2]));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return parseInt(date.getTime() / 1000);
        //            return parseInt(date.getTime());
    };
    dateformat = function (timestamp) {

        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" +
            (d.getMonth() + 1) + "-" +
            (d.getDate()) + " " +
            (d.getHours()) + ":" +
            (d.getMinutes()) + ":" +
            (d.getSeconds());
        return date;
    }


    /*上一页*/
    $scope.lastPage = function () {
        page_num1 = $scope.page_num;
        page_num1--;

        if (page_num1 >= 1) {
            $scope.page_num = page_num1;
            $scope.rechargeSearch(page_num1);
        } else {
            alert("已经是第一页");
        }
    }
    /*下一页*/
    $scope.nextPage = function () {
        page_num1 = $scope.page_num;
        page_num1++;

        if (page_all1 % 10 == 0) {
            if ((page_num1) * 10 <= page_all1) {
                $scope.page_num = page_num1;
                $scope.rechargeSearch(page_num1);
            } else {
                alert("已经是最后一页");
            }

        } else {
            if ((page_num1 - 1) * 10 <= page_all1) {
                $scope.page_num = page_num1;
                $scope.rechargeSearch(page_num1);
            } else {
                alert("已经是最后一页");
            }
        }
    }
    //手动出场
    $scope.exit=function(record_id){
        var attr = {
            "obj": "admin",
            "act": "entry_set",
            "record_id": record_id
        }
        server.publicMethod(attr, function (data) {
            $scope.rechargeSearch(page_num1);
        });
    }

});
