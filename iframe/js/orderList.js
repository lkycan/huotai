var app = angular.module('myApp', []);
app.controller('orderCtrl', function ($scope, $timeout) {
    var orderlistid = "";
//查询列表
    $scope.showdiv1 = true;
    $scope.showdiv2 = false;

//初始化page_num
    $scope.page_num = 1;
    var page_num1 =1;
    var page_all1 = 0;
    window.onload = function () {
        util.init(function () {
            $scope.start();
        });
    }


//拉取套餐列表。
// window.onload = function() {
//     util.init(function() {
//         /*查询列表  暂时隐藏*/ 

//     pack_list();

//     });  
// };

//搜索
    $scope.billList = function (page_num1) {
         $scope.page_num = page_num1;
        var time11 = document.getElementById("phonediv2").value;
        var time22 = document.getElementById("phonediv4").value;
        var time1 = " ";
        var time2 = " ";
        if (time11 != "") {
            time1 = $scope.getTimes(time11.split("-"));
        }

        if (time22 != "") {
            time2 = $scope.getTimes(time22.split("-"));
        }
        var phone = " ";
        if (undefined != $scope.phone && $scope.phone !="" ) {
            phone = $scope.phone;
        }
        var attr = {
            "obj": "admin",
            "act": "sold_list",
            "start_time": time1,
            "end_time": time2,
            "page_no": page_num1,
            "user_no": phone

        }
        server.publicMethod(attr, function (data) {
            console.log(data);
            $scope.sum_count=data.sum_count;
            page_all1=data.all_record_num;
            $scope.count=  data.all_record_num;
            $timeout(function () {
                for (var i = 0; i < data.list.length; i++) {
                    if( data.list[i].charge_type=="charge_by_num"){
                        var taocan = data.list[i].count + "次" + data.list[i].fee;
                        data.list[i].taocan = taocan;
                    }else {
                        var taocan = data.list[i].count + "天" + data.list[i].fee;
                        data.list[i].taocan = taocan;
                    }

                    var timestamp = data.list[i].et;
                    var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
                    var date = (d.getFullYear()) + "-" +
                        (d.getMonth() + 1) + "-" +
                        (d.getDate()) + " " +
                        (d.getHours()) + ":" +
                        (d.getMinutes()) + ":" +
                        (d.getSeconds());
                    data.list[i].date = date;


                }
                $scope.list = data.list;
            }, 1);
        });
    }

    /*上一页*/
    $scope.lastPage = function () {
           page_num1= $scope.page_num;
        page_num1--;
      
        if (page_num1 >= 1) {
              $scope.page_num=page_num1;
            $scope.billList(page_num1);
        } else {
            alert("已经是第一页");
        }
    }
    /*下一页*/
    $scope.nextPage = function () {
        page_num1= $scope.page_num;
        page_num1++;
     
        if (page_all1 % 10 == 0) {
            if ((page_num1 ) * 10 <= page_all1) {
                   $scope.page_num=page_num1;
                $scope.billList(page_num1);
            } else {
                alert("已经是最后一页");
            }

        } else {
            if ((page_num1-1) * 10 <= page_all1) {
                   $scope.page_num=page_num1;
                $scope.billList(page_num1);
            } else {
                alert("已经是最后一页");
            }
        }
    }




    $scope.orderList = function (page_num, page_all) {
        var time11 = document.getElementById("phonediv2").value;
        var time22 = document.getElementById("phonediv4").value;
        var time1 = "";
        var time2 = "";
        util.init(function () {
            /*查询列表  暂时隐藏*/

            if (time11 != "") {
                time1 = $scope.getTimes(time11.split("-"));

            }
            if (time22 != "") {
                time2 = $scope.getTimes(time22.split("-"));

            }


            var attr = {
                "obj": "admin",
                "act": "orderlist",
                "starttime": time1,
                "endtime": time2,
                "status": $scope.status,
                "courseid": $scope.courseid,
                "userid": $scope.userid,
                "page_num": page_num,
                "page_size": 10,
                "page_all": page_all
            }

            server.orderlist(attr, function (data) {

                $timeout(function () {

                    console.log(data)
                    $scope.list = data.info;
                    $scope.page_num = page_num;
                    page_num1 = page_num;
                    page_all1 = data.count;
                    $scope.count = data.count;
                }, 1);
            });
        });


    }

    $scope.getTimes = function (data1) {
        var date = new Date();
        date.setFullYear(parseInt(data1[0]));
        date.setMonth(parseInt(data1[1]) - 1);
        date.setDate(parseInt(data1[2]));
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return parseInt(date.getTime() / 1000);
        //            return parseInt(date.getTime());
    }

    $scope.start = function () {

        server.login(localStorage.getItem("login_name"), localStorage.getItem("login_passwd"), function (data) {
            GameObj.login = data;
            if (data.ustr != undefined && data.ustr != "") {

            } else {
                //  level分为 YM YMD H HM 四个有效值，分别表示年月 年月日 年月日时 年月日时分,less表示是否不可小于当前时间。年-月-日 时:分 时为24小时制
                //  为确保控件结构只出现一次，在有需要的时候进行一次调用。
                onLoadTimeChoiceDemo();

                //        borainTimeChoice({
                //            start: ".start",
                //            end: ".end",
                //            level: "YM",
                //            less: true
                //        });

                borainTimeChoice({
                    start: ".start-two",
                    end: "",
                    level: "YMD",
                    less: false
                });
                borainTimeChoice({
                    start: ".start-two2",
                    end: "",
                    level: "YMD",
                    less: false
                });

                borainTimeChoice({
                    start: ".editkai",
                    end: "",
                    level: "YMD",
                    less: false
                });
                borainTimeChoice({
                    start: ".editend",
                    end: "",
                    level: "YMD",
                    less: false
                });


            }
            //pageObj.alert(data.ustr);
        });

    }




});
