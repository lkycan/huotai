var $$ = function (id, tag) {
    return !tag ? document.querySelector(id) : document.querySelectorAll(id);
}

var $$_bind = function (id, key, callback) {
    if (typeof id == "string") {
        $$(id).addEventListener(key, callback, false);
    } else {
        id.addEventListener(key, callback, false);
    }
}
var $$_unbind = function (id, key, callback) {
    if (typeof id == "string") {
        $$(id).removeEventListener(key, callback, false);
    } else {
        id.removeEventListener(key, callback, false);
    }
}

var acc = localStorage.getItem("login_name");
var pwd = localStorage.getItem("login_passwd");

function zhuxiao() {
    localStorage.removeItem("login_name");
    localStorage.removeItem("login_passwd");
    location.href = "login.html";
}
window.onload = function () {
    if (window.buildObj) {
        if (acc == undefined || pwd == undefined) {
            location.href = "login.html";
            return;
        }
        if (acc != undefined && acc != "") {
            document.getElementById("account").innerHTML = acc + "<span onclick='zhuxiao()'>注销</span>";
        }
        util.init(function () {
            //apiInfoData.server_info.download_path 
            console.log(apiInfoData);
            if (acc != "" && pwd != "") {
                server.login(acc, pwd, function (data) {
                    GameObj.login = data;
                    if (data.ustr != undefined && data.ustr != "") {

                    } else {
                        setiframe(3);
                    }
                    //pageObj.alert(data.ustr);
                });
            }
        });
    } else {
        util.init(function () {
            //apiInfoData.server_info.download_path 
            console.log(apiInfoData);
        });
    }

}

var GameObj = {
    cachePage: {}
};

//当前页面
var currNum = 1;
//打开页面
function openType(num) {
    var liarr = $$("#layer2_2_1 ul li", true);
    for (var i = 0; i < liarr.length; i++) {
        var one = liarr[i];
        one.style.backgroundColor = "transparent";
    }
    $$("#layer2_2_1 ul li:nth-child(" + num + ")").style.backgroundColor = "white";

    if (!GameObj.cachePage[currNum]) {
        GameObj.cachePage[currNum] = pageObj["page" + currNum]();
    }
    if (!GameObj.cachePage[num]) {
        GameObj.cachePage[num] = pageObj["page" + num]();
    }

    GameObj.cachePage[currNum].destory();
    currNum = num;
    GameObj.cachePage[num].init().draw();
}


var pageObj = {
    alert: function (ustr) {
        if (ustr != "" && ustr != undefined) {
            alert(ustr);
        }
    },
    _acc: "",
    _code: "",
    appendLi: function (acc, pwd, id) {
        var li = document.createElement("li");
        li.innerHTML = '<span class="ly2_li_1">' + acc + '</span><span class="ly2_li_2">' + pwd + '</span><div data-typeid="' + id + '" class="ly2_li_3">删除</div>';
        $$_bind(li.querySelector(".ly2_li_3"), "click", pageObj.page1_deleteFun);
        $$("#layer2_2_2_1_2 ul").appendChild(li);
    },
    page1_xiugaimimaFun: function () {
        //修改密码  
        var jiumima = $$("#layer2_2_2_1_1_2s").value;
        var acc = $$("#layer2_2_2_1_1_3s").value;
        var pwd = $$("#layer2_2_2_1_1_4s").value;
        if (jiumima != "" && acc != "" && pwd != "") {
            if (acc != pwd) {
                alert("新密码不相同");
                return;
            }
            server.admin_changepasswd(jiumima, acc, pwd, function (data) {
                if (data.status == "success") {
                    pageObj._code = pwd;
                    $$("#layer2_2_2_1_1_2s").value = "";
                    $$("#layer2_2_2_1_1_3s").value = "";
                    $$("#layer2_2_2_1_1_4s").value = "";
                }
                pageObj.alert(data.ustr);
            });

        } else {
            if (jiumima == "") {
                alert("请输入旧密码");
            } else if (acc == "") {
                alert("请输入新密码");
            } else if (pwd == "") {
                alert("请输入重复密码");
            }
        }
    },
    page1_tianjiaFun: function () {
        console.log("点击添加");
        var acc = $$("#layer2_2_2_1_1_2").value;
        var pwd = $$("#layer2_2_2_1_1_4").value;
        if (acc != "" && pwd != "") {
            server.admin_addaccount(acc, pwd, function (data) {
                if (data.status == "success") {
                    pageObj.appendLi(acc, "", data.id);
                    $$("#layer2_2_2_1_1_2").value = "";
                    $$("#layer2_2_2_1_1_4").value = "";
                }
                pageObj.alert(data.ustr);
            });

        } else {
            if (acc == "") {
                alert("请输入账号");
            } else if (pwd == "") {
                alert("请输入密码");
            }
        }
    },
    page1_deleteFun: function () {
        var parent = this;
        var typeid = this.getAttribute("data-typeid");
        server.admin_delaccount(typeid, function (data) {
            if (data.status == "success") {
                parent.parentElement.parentElement.removeChild(parent.parentElement);
            }
            pageObj.alert(data.ustr);

        });
        console.log("点击删除", typeid, this);
    },
    page2_quxiaobianjiFun: function () {
        //取消发布
        $$("#layer2_2_2_2_3").style.display = "none";
    },
    page2_fabubianjiFun: function () {
        //获得编辑文本


        var content = pageObj.editor2.txt.html();
        var name = $$("#bianjiqi_2_1").value;
        var weight = $$("#bianjiqi_3_1 input").value;
        var deadline = $$("#bianjiqi_3_2 input").value;
        var time = $$("#bianjiqi_3_3 input").value;
        var value = $$("#bianjiqi_3_4 input").value;

        var picture = [];
        for (var i = 0; i < GameObj.cachePage[2].picture.length; i++) {
            if (GameObj.cachePage[2].picture[i] != null) {
                picture.push(GameObj.cachePage[2].picture[i]);
            }
        }
        if (name == "") {
            alert("商品名称不能为空");
            return;
        }
        if (weight == "") {
            alert("商品净重不能为空");
            return;
        }
        if (deadline == "") {
            alert("保质期不能为空");
            return;
        }
        if (time == "") {
            alert("生产时间不能为空");
            return;
        }
        if (value == "") {
            alert("价格不能为空");
            return;
        }

        var id = $$("#bianjiqi_1_2").getAttribute("data-id");
        var types = $$("#bianjiqi_1_2").getAttribute("data-type");
        var keys = "admin_addgoods";
        var calls = function () {
            //跟新
            var lis = $$("#layer2_2_2_2_2s li", true);
            for (var i = 0; i < lis.length; i++) {
                //admin_delgoods
                $$_unbind(lis[i].querySelector(".layer2_itembianji"), "click", pageObj.page2_li_bianjiFun);
                $$_unbind(lis[i].querySelector(".layer2_itemdelete"), "click", pageObj.page2_li_shanchuFun);
            }
            $$("#layer2_2_2_2_2s ul").innerHTML = "";

            var parent = GameObj.cachePage[2];
            parent.currentpage = 0;
            parent.totalpage = 0;
            parent.pagenum = 0;
            parent.currpage();
        }
        if (types == "1") {
            keys = "admin_addgoods";
        } else {
            keys = "admin_modifygoods";
        }
        server[keys](id, name, weight, deadline, time, value, content, picture, function (data) {
            if (data.status == "success") {
                //确认发布
                $$("#layer2_2_2_2_3").style.display = "none";
                calls();
            }
            pageObj.alert(data.ustr);
        });
        console.log(name, weight, deadline, time, value, content, picture);
    },
    page2_addbianjiFun: function () {
        //添加商品
        $$("#layer2_2_2_2_3").style.display = "block";

        pageObj.editor2.txt.html("");
        GameObj.cachePage[2].picture = [null, null, null, null, null, null];
        GameObj.cachePage[2].showPicture();
        $$("#bianjiqi_2_1").value = "";
        $$("#bianjiqi_3_1 input").value = "";
        $$("#bianjiqi_3_2 input").value = "";
        $$("#bianjiqi_3_3 input").value = "";
        $$("#bianjiqi_3_4 input").value = "";
        $$("#bianjiqi_1_2").innerHTML = "确认发布";
        $$("#bianjiqi_1_2").setAttribute("data-type", "1");
        $$("#bianjiqi_1_2").setAttribute("data-id", "");
    },
    page2_sousuojiFun: function () {
        //搜索商品
        GameObj.cachePage[2].sousuo();
    },
    page2_li_bianjiFun: function () {
        //编辑信息  
        var id = this.getAttribute("data-id");
        var obj = GameObj.cachePage[2].listObj[id];
        console.log(obj);

        //        pageObj.page2_addbianjiFun();
        $$("#layer2_2_2_2_3").style.display = "block";
        pageObj.editor2.txt.html(obj.content);

        $$("#bianjiqi_2_1").value = obj.name;
        $$("#bianjiqi_3_1 input").value = obj.weight;
        $$("#bianjiqi_3_2 input").value = obj.deadline;
        $$("#bianjiqi_3_3 input").value = obj.time;
        $$("#bianjiqi_3_4 input").value = obj.value;

        var picture = [null, null, null, null, null, null];
        var ns = 0;
        for (var i in obj.picture) {
            picture[ns] = i;
            ns++;
        }
        GameObj.cachePage[2].picture = picture;
        GameObj.cachePage[2].showPicture();

        $$("#bianjiqi_1_2").innerHTML = "确认编辑";
        $$("#bianjiqi_1_2").setAttribute("data-type", "2");
        $$("#bianjiqi_1_2").setAttribute("data-id", obj._id);
    },
    page2_li_shanchuFun: function () {
        //删除
        var dom = this.parentNode;
        var id = this.getAttribute("data-id");
        server.admin_delgoods(id, function (data) {
            if (data.status == "success") {
                dom.style.display = "none";
            }
            pageObj.alert(data.ustr);
        });
    },
    page1: function () {
        return {
            init: function () {
                $$("#layer2_2_2_1").style.display = "block";
                $$_bind("#layer2_2_2_1_1_5", "click", pageObj.page1_tianjiaFun);
                $$_bind("#layer2_2_2_1_1_5s", "click", pageObj.page1_xiugaimimaFun);

                var lis = $$("#layer2_2_2_1_2  li .ly2_li_3", true);
                for (var i = 0; i < lis.length; i++) {
                    $$_bind(lis[i], "click", pageObj.page1_deleteFun);
                }

                server.admin_accountlist(function (data) {
                    if (data.status == "success") {
                        for (var s = 0; s < data.info.length; s++) {
                            var oneinfo = data.info[s];
                            pageObj.appendLi(oneinfo.display_name, "", oneinfo.id);
                        }
                    }
                    console.log(data);
                });
                return this;
            },
            draw: function () {
                return this;
            },
            destory: function () {
                $$("#layer2_2_2_1").style.display = "none";
                $$_unbind("#layer2_2_2_1_1_5", "click", pageObj.page1_tianjiaFun);
                $$_unbind("#layer2_2_2_1_1_5s", "click", pageObj.page1_xiugaimimaFun);
                var lis = $$("#layer2_2_2_1_2  li .ly2_li_3", true);
                for (var i = 0; i < lis.length; i++) {
                    $$_unbind(lis[i], "click", pageObj.page1_deleteFun);
                }
                $$("#layer2_2_2_1_2 ul").innerHTML = "";
                return this;
            }
        }
    },
    editor2: null,
    page2: function () {
        var ul = $$("#layer2_2_2_2_2s ul");
        return {
            listObj: {},
            addOneli: function (obj) {
                if (!obj) {
                    obj = {};
                }
                var li = document.createElement("li");
                var text = '';
                text += '<div class="layer2_item">' + obj.name + '</div>';
                text += '<div class="layer2_itemprice">' + obj.value + '</div>';
                text += '<div class="layer2_itemdelete" data-id="' + obj._id + '">删除</div>';
                text += '<div class="layer2_itembianji" data-id="' + obj._id + '">编辑</div>';
                li.innerHTML = text;

                $$_bind(li.querySelector(".layer2_itembianji"), "click", pageObj.page2_li_bianjiFun);
                $$_bind(li.querySelector(".layer2_itemdelete"), "click", pageObj.page2_li_shanchuFun);

                this.listObj[obj._id] = obj;

                ul.appendChild(li);
            },
            currentpage: 0,
            totalpage: 0,
            pagenum: 0,
            nextpage: function () {
                this.currentpage++;
                //                if (this.currentpage >= this.totalpage) {
                //                    this.currentpage = this.totalpage;
                //                }
                this.currpage();
            },
            currpage: function () {
                var parent = this;
                var val = $$("#layer2_2_2_2_sousoinput").value;
                if (parent.inputVal != val) {
                    //如果搜索框内容不一样，则清理
                    var lis = $$("#layer2_2_2_2_2s li", true);
                    for (var i = 0; i < lis.length; i++) {
                        //admin_delgoods
                        $$_unbind(lis[i].querySelector(".layer2_itembianji"), "click", pageObj.page2_li_bianjiFun);
                        $$_unbind(lis[i].querySelector(".layer2_itemdelete"), "click", pageObj.page2_li_shanchuFun);
                    }
                    $$("#layer2_2_2_2_2s ul").innerHTML = "";

                    parent.currentpage = 0;
                    parent.totalpage = 0;
                    parent.pagenum = 0;
                }
                var keys = "admin_goodslist";
                var content = "";
                if (val == "") {
                    keys = "admin_goodslist";
                } else {
                    keys = "admin_searchgoods";
                    content = val;
                }
                parent.inputVal = val;

                server[keys](content, this.totalpage, this.currentpage, this.pagenum, function (data) {
                    if (data.status == "success") {
                        parent.currentpage = data.currentpage;
                        parent.totalpage = data.totalpage;
                        parent.pagenum = data.amount;
                        //                        ul.innerHTML = "";
                        for (var i = 0; i < data.list.length; i++) {
                            parent.addOneli(data.list[i]);
                        }
                    }
                });
            },
            nextbtn: function () {
                console.log(this);

                if (GameObj.cachePage[2].issousuo) {
                    GameObj.cachePage[2].issousuo = false;
                    var parent = GameObj.cachePage[2];
                    parent.currentpage = 0;
                    parent.totalpage = 0;
                    parent.pagenum = 0;
                    parent.currpage();
                } else {
                    GameObj.cachePage[2].nextpage();
                }
            },
            sousuo: function () {
                //搜索
                var lis = $$("#layer2_2_2_2_2s li", true);
                for (var i = 0; i < lis.length; i++) {
                    //admin_delgoods
                    $$_unbind(lis[i].querySelector(".layer2_itembianji"), "click", pageObj.page2_li_bianjiFun);
                    $$_unbind(lis[i].querySelector(".layer2_itemdelete"), "click", pageObj.page2_li_shanchuFun);
                }
                $$("#layer2_2_2_2_2s ul").innerHTML = "";
                var parent = GameObj.cachePage[2];
                parent.currentpage = 0;
                parent.totalpage = 0;
                parent.pagenum = 0;
                parent.currpage();
            },
            picture: [],
            init: function () {
                $$("#layer2_2_2_2").style.display = "block";
                $$("#layer2_2_2_2_3").style.display = "none";
                if (!pageObj.editor2) {
                    var E = window.wangEditor;
                    pageObj.editor2 = new E('#bianjiqi_5');
                    // 使用 base64 保存图片
                    //                    pageObj.editor2.customConfig.uploadImgShowBase64 = true;

                    // 上传图片到服务器
                    pageObj.editor2.customConfig.uploadImgServer = 'http://39.105.16.49/cgi-bin/upload.pl';
                    pageObj.editor2.create();
                    $$("#bianjiqi_5 .w-e-text-container").style.height = "220px";
                }

                $$("#layer2_2_2_2_sousoinput").value = "";
                this.inputVal = "";

                this.picture = [null, null, null, null, null, null];
                this.showPicture();

                this.currentpage = 0;
                this.totalpage = 0;
                this.pagenum = 0;
                this.currpage();

                $$_bind("#page2Next", "click", this.nextbtn);

                $$_bind("#layer2_2_2_2_sousobtn", "click", pageObj.page2_sousuojiFun);
                $$_bind("#layer2_2_2_2_addbtn", "click", pageObj.page2_addbianjiFun);
                $$_bind("#bianjiqi_1_1", "click", pageObj.page2_quxiaobianjiFun);
                $$_bind("#bianjiqi_1_2", "click", pageObj.page2_fabubianjiFun);

                $$_bind("#bianjiqi_4_1 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_bind("#bianjiqi_4_2 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_bind("#bianjiqi_4_3 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_bind("#bianjiqi_4_4 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_bind("#bianjiqi_4_5 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_bind("#bianjiqi_4_6 .bianjiqi_4_div_1", "change", this.changePicture);

                //编辑 
                return this;
            },
            changePicture: function () {
                var parent = this;
                var num = this.getAttribute("data-num");
                var fileList = this.files;
                if (fileList.length) {
                    changeLoad(fileList, function (src, fid) {
                        GameObj.cachePage[2].picture[num] = fid;
                        GameObj.cachePage[2].showPicture();
                        parent.value = "";
                    });
                }
            },
            showPicture: function () {
                for (var i = 0; i < 6; i++) {
                    var one = this.picture[i];
                    $$("#bianjiqi_4_" + (i + 1) + " .bianjiqi_4_div_2 span").innerHTML = one ? "有" : "无";
                }
            },

            draw: function () {
                return this;
            },
            destory: function () {
                $$("#layer2_2_2_2").style.display = "none";

                $$_unbind("#page2Next", "click", this.nextbtn);
                $$_unbind("#layer2_2_2_2_addbtn", "click", pageObj.page2_addbianjiFun);
                $$_unbind("#bianjiqi_1_1", "click", pageObj.page2_quxiaobianjiFun);
                $$_unbind("#bianjiqi_1_2", "click", pageObj.page2_fabubianjiFun);

                $$_unbind("#layer2_2_2_2_sousobtn", "click", pageObj.page2_sousuojiFun);
                $$_unbind("#bianjiqi_4_1 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_unbind("#bianjiqi_4_2 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_unbind("#bianjiqi_4_3 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_unbind("#bianjiqi_4_4 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_unbind("#bianjiqi_4_5 .bianjiqi_4_div_1", "change", this.changePicture);
                $$_unbind("#bianjiqi_4_6 .bianjiqi_4_div_1", "change", this.changePicture);

                var lis = $$("#layer2_2_2_2_2s li", true);
                for (var i = 0; i < lis.length; i++) {
                    //admin_delgoods
                    $$_unbind(lis[i].querySelector(".layer2_itembianji"), "click", pageObj.page2_li_bianjiFun);
                    $$_unbind(lis[i].querySelector(".layer2_itemdelete"), "click", pageObj.page2_li_shanchuFun);
                }
                $$("#layer2_2_2_2_2s ul").innerHTML = "";

                this.listObj = {};
                return this;
            }
        }
    },
    page3_selectiFun: function () {
        var id = this.getAttribute("data-id");
        var statues = this.value;
        server.admin_setorder(id, statues, function (data) {
            if (data.status == "success") {

            }
            pageObj.alert(data.ustr);
        });
    },
    page3: function () {
        var ul = $$("#layer2_2_2_2_2t ul");
        return {
            addOneli: function (obj) {
                if (!obj) {
                    obj = {};
                }
                var li = document.createElement("li");
                var text = '';



                text += '<div class="dingdan_title_1 dingdan_title">' + obj.goodsname + '</div>';
                text += '<div class="dingdan_title_2 dingdan_title">' + obj.code + '</div>';
                text += '<div class="dingdan_title_3 dingdan_title">' + obj.name + '</div>';
                text += '<div class="dingdan_title_4 dingdan_title">' + obj.phone + '</div>';
                text += '<div class="dingdan_title_5 dingdan_title">' + obj.address + '</div>';
                text += '<div class="dingdan_title_6 dingdan_title">' + obj.time + '</div>';
                text += '<div class="dingdan_title_7 dingdan_title">';
                text += '<select data-id="' + obj._id + '">';

                if (obj.status == "unsend") {
                    text += '<option value="unsend">待发货</option>';
                    text += '<option value="send">已发货</option>';
                } else {
                    text += '<option value="send">已发货</option>';
                    text += '<option value="unsend">待发货</option>';

                }

                text += '</select>';
                text += '</div>';

                li.innerHTML = text;

                $$_bind(li.querySelector(".dingdan_title_7 select"), "change", pageObj.page3_selectiFun);
                ul.appendChild(li);
            },
            currentpage: 0,
            totalpage: 0,
            pagenum: 0,
            nextpage: function () {
                this.currentpage++;
                //                if (this.currentpage >= this.totalpage) {
                //                    this.currentpage = this.totalpage;
                //                }
                this.currpage();
            },
            currpage: function () {
                var parent = this;
                server.admin_orderslist(this.totalpage, this.currentpage, this.pagenum, function (data) {
                    if (data.status == "success") {
                        parent.currentpage = data.currentpage;
                        parent.totalpage = data.totalpage;
                        parent.pagenum = data.amount;
                        //                        ul.innerHTML = "";
                        for (var i = 0; i < data.list.length; i++) {
                            parent.addOneli(data.list[i]);
                        }
                    }
                });
            },
            nextbtn: function () {
                console.log(this);
                GameObj.cachePage[3].nextpage();
            },
            init: function () {
                $$("#layer2_2_2_3").style.display = "block";


                this.currentpage = 0;
                this.totalpage = 0;
                this.pagenum = 0;
                this.currpage();


                $$_bind("#page3Next", "click", this.nextbtn);
                return this;
            },
            draw: function () {
                return this;
            },
            destory: function () {
                $$("#layer2_2_2_3").style.display = "none";

                $$_unbind("#page3Next", "click", this.nextbtn);
                var lis = $$("#layer2_2_2_2_2t li", true);
                for (var i = 0; i < lis.length; i++) {
                    $$_unbind(lis[i].querySelector(".dingdan_title_7 select"), "change", pageObj.page3_selectiFun);
                }
                $$("#layer2_2_2_2_2t ul").innerHTML = "";
                return this;
            }
        }
    },
    page4_tiqumaFun: function () {
        var val1 = $$("#shengchengmianzhi").value; //面额
        var val2 = $$("#shengchenghsuliang").value; //数量
        var youxiaoqi = $$("#shengchanyouxiaoqi").value; //有效期
        if (val2 == "") {
            alert("请输入生成数量");
            return;
        }
        if (youxiaoqi == "") {
            alert("请输入生成有效期");
            return;
        }
        if (!youxiaoqi.match(/.{0,}-.{0,}-.{0,}/)) {
            alert("有效期格式：年-月-日");
            return;
        }

        val2 = parseInt(val2);
        if (val2 > 0) {
            server.admin_producecode(val1, val2, youxiaoqi, function (data) {
                if (data.status == "success") {
                    $$("#shengchenghsuliang").value = "";

                    var lis = $$("#layer2_2_2_2_2ss ul li", true);
                    for (var i = 0; i < lis.length; i++) {
                        var li = lis[i];
                        var deledom = li.querySelector(".dingdan_title_5_1");
                        if (deledom) {
                            $$_unbind(deledom, "click", pageObj.page4_deleteFun);
                        }
                    }
                    $$("#layer2_2_2_2_2ss ul").innerHTML = "";

                    var parent = GameObj.cachePage[4];
                    parent.currentpage = 0;
                    parent.totalpage = 0;
                    parent.pagenum = 0;
                    parent.currpage();

                }
                pageObj.alert(data.ustr);
            });
        } else {
            alert("数量必须大于0");
        }
    },
    page4_deleteFun: function () {
        //删除  
        var dom = this.parentNode.parentNode;
        var id = this.getAttribute("data-id");
        server.admin_delcode(id, function (data) {
            if (data.status == "success") {
                dom.style.display = "none";
                var parent = GameObj.cachePage[4];
                //                parent.currentpage = 0;
                //                parent.totalpage = 0;
                //                parent.pagenum = 0;
                parent.currpage();
            }
            pageObj.alert(data.ustr);
        });
        console.log(id);
    },
    page4: function () {
        var ul = $$("#layer2_2_2_2_2ss ul");
        return {
            addOneli: function (obj) {
                var li = document.createElement("li");
                var text = "";
                text += '<div class="dingdan_title_1 dingdan_title">' + obj.code + '</div>';
                text += '<div class="dingdan_title_2 dingdan_title">' + obj.passwd + '</div>';
                text += '<div class="dingdan_title_3 dingdan_title">' + obj.time + '</div>';
                text += '<div class="dingdan_title_4 dingdan_title">' + obj.value + '</div>';
                text += '<div class="dingdan_title_5 dingdan_title" style="width:170px;">有效期：';
                text += obj.deadline_time;
                text += '</div>';


                text += '<div class="dingdan_title_5 dingdan_title" style="left:635px;">';
                text += '<div class="dingdan_title_5_1" data-id="' + obj._id + '">删除</div>';
                text += '</div>';

                li.innerHTML = text;
                $$_bind(li.querySelector(".dingdan_title_5_1"), "click", pageObj.page4_deleteFun);

                ul.appendChild(li);
            },
            currentpage: 0,
            totalpage: 0,
            pagenum: 0,
            nextpage: function () {
                this.currentpage++;
                //                if (this.currentpage >= this.totalpage) {
                //                    this.currentpage = this.totalpage;
                //                }
                this.currpage();
            },
            currpage: function () {
                var parent = this;
                server.admin_codelist(this.totalpage, this.currentpage, this.pagenum, function (data) {
                    if (data.status == "success") {
                        parent.currentpage = data.currentpage;
                        parent.totalpage = data.totalpage;
                        parent.pagenum = data.amount;
                        //                        ul.innerHTML = "";
                        for (var i = 0; i < data.list.length; i++) {
                            parent.addOneli(data.list[i]);
                        }
                    }
                });
            },
            nextbtn: function () {
                console.log(this);
                GameObj.cachePage[4].nextpage();
            },
            init: function () {
                var parent = this;

                $$("#layer2_2_2_4").style.display = "block";
                //提取码 
                $$_bind("#build_tiquma", "click", pageObj.page4_tiqumaFun);
                $$_bind("#page4Next", "click", this.nextbtn);

                this.currentpage = 0;
                this.totalpage = 0;
                this.pagenum = 0;
                this.currpage();
                return this;
            },
            draw: function () {
                return this;
            },
            destory: function () {
                $$_unbind("#build_tiquma", "click", pageObj.page4_tiqumaFun);
                $$_unbind("#page4Next", "click", this.nextbtn);

                var lis = $$("#layer2_2_2_2_2ss ul li", true);
                for (var i = 0; i < lis.length; i++) {
                    var li = lis[i];
                    var deledom = li.querySelector(".dingdan_title_5_1");
                    if (deledom) {
                        $$_unbind(deledom, "click", pageObj.page4_deleteFun);
                    }
                }

                $$("#layer2_2_2_2_2ss ul").innerHTML = "";
                $$("#layer2_2_2_4").style.display = "none";

                return this;
            }
        }
    },
    page5_setstateFun: function () {
        //设置状态
        var id = this.getAttribute("data-id");
        var value = this.value;
        server.admin_setcode(id, value, function (data) {
            if (data.status == "success") {}
            pageObj.alert(data.ustr);
        });
        //        console.log(id, value);
    },
    page5: function () {
        var ul = $$("#layer2_2_2_2_2sss ul");
        return {
            addOneli: function (obj) {
                var li = document.createElement("li");
                var text = "";
                text += '<div class="dingdan_title_1 dingdan_title">' + obj.code + '</div>';
                text += '<div class="dingdan_title_2 dingdan_title">' + obj.passwd + '</div>';

                text += '<div class="dingdan_title_3 dingdan_title">' + obj.value + '</div>';

                if (obj.status == "disable") {
                    text += '<div class="dingdan_title_5 dingdan_title" style="text-align: left;"><select data-id="' + obj._id + '"><option selected = "selected" value="disable">失效/未激活</option><option value="enable">有效</option><option value="used">已使用</option></select></div>';
                } else if (obj.status == "enable") {
                    text += '<div class="dingdan_title_5 dingdan_title" style="text-align: left;"><select data-id="' + obj._id + '"><option  value="disable">失效/未激活</option><option selected = "selected" value="enable">有效</option><option value="used">已使用</option></select></div>';
                } else if (obj.status == "used") {
                    text += '<div class="dingdan_title_5 dingdan_title" style="text-align: left;"><select data-id="' + obj._id + '"><option  value="disable">失效/未激活</option><option value="enable">有效</option><option selected = "selected" value="used">已使用</option></select></div>';
                }

                li.innerHTML = text;
                $$_bind(li.querySelector(".dingdan_title_5 select"), "change", pageObj.page5_setstateFun);

                ul.appendChild(li);
            },
            currentpage: 0,
            totalpage: 0,
            pagenum: 0,
            nextpage: function () {
                this.currentpage++;
                //                if (this.currentpage >= this.totalpage) {
                //                    this.currentpage = this.totalpage;
                //                }
                this.currpage();
            },
            currpage: function () {
                var parent = this;
                server.admin_codelist(this.totalpage, this.currentpage, this.pagenum, function (data) {
                    if (data.status == "success") {
                        parent.currentpage = data.currentpage;
                        parent.totalpage = data.totalpage;
                        parent.pagenum = data.amount;
                        //                        ul.innerHTML = "";
                        for (var i = 0; i < data.list.length; i++) {
                            parent.addOneli(data.list[i]);
                        }
                    }
                });
            },
            nextbtn: function () {
                console.log(this);

                if (GameObj.cachePage[5].issousuo) {
                    GameObj.cachePage[5].issousuo = false;
                    var parent = GameObj.cachePage[5];
                    parent.currentpage = 0;
                    parent.totalpage = 0;
                    parent.pagenum = 0;
                    parent.currpage();
                } else {
                    GameObj.cachePage[5].nextpage();
                }

            },
            sousuo: function () {
                //搜索
                var val = $$("#tiquma5").value;
                if (val == "") {
                    alert("请输入搜索提取码");
                    return;
                }
                server.admin_searchcode(val, function (data) {
                    GameObj.cachePage[5].issousuo = true;
                    $$("#tiquma5").value = "";

                    var lis = $$("#layer2_2_2_2_2sss ul li", true);
                    for (var i = 0; i < lis.length; i++) {
                        var li = lis[i];
                        var deledom = li.querySelector(".dingdan_title_5 select");
                        if (deledom) {
                            $$_unbind(deledom, "change", pageObj.page5_setstateFun);
                        }
                    }
                    $$("#layer2_2_2_2_2sss ul").innerHTML = "";

                    if (data.status == "success") {
                        var parent = GameObj.cachePage[5];
                        parent.addOneli(data.data);

                    }
                    pageObj.alert(data.ustr);
                });
            },
            init: function () {
                this.issousuo = false;

                $$("#layer2_2_2_5").style.display = "block";
                $$_bind("#page5Next", "click", this.nextbtn);
                $$_bind("#sousuo5", "click", this.sousuo);

                this.currentpage = 0;
                this.totalpage = 0;
                this.pagenum = 0;
                this.currpage();

                return this;
            },
            draw: function () {
                return this;
            },
            destory: function () {
                this.issousuo = false;

                $$_unbind("#page5Next", "click", this.nextbtn);
                $$_unbind("#sousuo5", "click", this.sousuo);

                var lis = $$("#layer2_2_2_2_2sss ul li", true);
                for (var i = 0; i < lis.length; i++) {
                    var li = lis[i];
                    var deledom = li.querySelector(".dingdan_title_5 select");
                    if (deledom) {
                        $$_unbind(deledom, "change", pageObj.page5_setstateFun);
                    }
                }

                $$("#layer2_2_2_2_2sss ul").innerHTML = "";

                $$("#layer2_2_2_5").style.display = "none";
                return this;
            }
        }
    },
    page6_changeFun: function () {
        // 获取选中的 file 对象列表
        var parent = this;
        var flag = this.getAttribute("data-flag");
        var fileList = this.files;
        var inputdom = $$("#" + flag + "_val");
        if (fileList.length) {
            changeLoad(fileList, function (src, fid) {
                //src
                //                console.log(inputdom, flag, fid);
                inputdom.value = fid;
                parent.value = "";
            });
        }
    },
    page6_submitFun: function () {
        //提交  
        var id = this.id;
        var flag = "";
        var roll = "",
            link = "";
        if (id == "rollsub1") {
            flag = "roll1";
            roll = $$("#roll1_val").value;
            link = $$("#link1_val").value;
        } else if (id == "rollsub2") {
            flag = "roll2";
            roll = $$("#roll2_val").value;
            link = $$("#link2_val").value;
        } else if (id == "rollsub3") {
            flag = "roll3";
            roll = $$("#roll3_val").value;
            link = $$("#link3_val").value;
        }
        console.log(roll, link);
        if (roll == "") {
            alert("请上传图片");
            return;
        }
        if (link == "") {
            alert("请设置链接地址");
            return;
        }
        server.admin_rollpicture(roll, link, flag, function (data) {
            if (data.status == "success") {

            }
            pageObj.alert(data.ustr);
        });
    },
    page6: function () {
        return {
            init: function () {
                $$("#layer2_2_2_6").style.display = "block";


                $$("#roll1_val").value = "";
                $$("#link1_val").value = "";

                $$("#roll2_val").value = "";
                $$("#link2_val").value = "";

                $$("#roll3_val").value = "";
                $$("#link3_val").value = "";
                //
                $$_bind("#lunbo1", "change", pageObj.page6_changeFun);
                $$_bind("#lunbo2", "change", pageObj.page6_changeFun);
                $$_bind("#lunbo3", "change", pageObj.page6_changeFun);

                $$_bind("#rollsub1", "click", pageObj.page6_submitFun);
                $$_bind("#rollsub2", "click", pageObj.page6_submitFun);
                $$_bind("#rollsub3", "click", pageObj.page6_submitFun);

                server.admin_readrollpicture(function (data) {
                    if (data.status == "success") {

                        $$("#roll1_val").value = data.data.roll1.picid;
                        $$("#link1_val").value = data.data.roll1.link;

                        $$("#roll2_val").value = data.data.roll2.picid;
                        $$("#link2_val").value = data.data.roll2.link;

                        $$("#roll3_val").value = data.data.roll3.picid;
                        $$("#link3_val").value = data.data.roll3.link;
                    }
                });
                return this;
            },
            draw: function () {
                return this;
            },
            destory: function () {
                $$_unbind("#lunbo1", "change", pageObj.page6_changeFun);
                $$_unbind("#lunbo2", "change", pageObj.page6_changeFun);
                $$_unbind("#lunbo3", "change", pageObj.page6_changeFun);

                $$_unbind("#rollsub1", "click", pageObj.page6_submitFun);
                $$_unbind("#rollsub2", "click", pageObj.page6_submitFun);
                $$_unbind("#rollsub3", "click", pageObj.page6_submitFun);
                $$("#layer2_2_2_6").style.display = "none";
                return this;
            }
        }
    }
}
