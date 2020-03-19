function getData(attr, callback) {
    //attr.person_id=person_id;
    console.info("send:", JSON.stringify(attr));
    //发送信息
    apiCallback[attr.obj + "_" + attr.act] = function (data) {
        //console.log("获取信息:",data);
        if (callback) {
            callback(data);
        }
    }
    apiconn.send_obj(attr);
}
var server = {

    //登录
    login: function (account, code, call) {
        var type = 1;
        apiCallback["person_login"] = function (data) {
            //这是入口
            console.info("login回调!!", data);
            if (call) {
                call(data);
            }
        }

        var attr = {
            "ctype": "admin",
            "login_name":account,
            "login_passwd": code
        }
        apiconn.credentialx(attr);
        apiconn.connect();

        //
        //        apiconn.credential(account, code);
        //        apiconn.connect();

    },


    admin_getserphone: function (call) {
        //admin getserphone 获取服务电话 #30 客服电话
        var attr = {
            "obj": "admin",
            "act": "getserphone"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_setserphone: function (val, call) {
        //admin setserphone 设置服务电话 #30 客服电话
        var attr = {
            "obj": "admin",
            "act": "setserphone",
            serphone: val,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_getprotocol: function (call) {
        //admin getprotocol 获取协议内容 #30 服务协议
        var attr = {
            "obj": "admin",
            "act": "getprotocol"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_setprotocol: function (val, call) {
        //admin setprotocol 设置协议内容 #30 服务协议
        var attr = {
            "obj": "admin",
            "act": "setprotocol",
            protocol: val
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_bannerlist: function (location, starttime, endtime, status, call) {
        //admin bannerlist 列表 #29 banner管理
        /*
            		TOP ↑
输入：
	location:app/pc         不过滤就为空
	starttime: unix时间戳   不过滤就为空
	endtime: unix时间戳     不过滤就为空
	status:已结束/未开始/进行中     不过滤就为空

*/
        var attr = {
            "obj": "admin",
            "act": "bannerlist",
            location: location,
            starttime: starttime,
            endtime: endtime,
            status: status,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_banneradd: function (name, location, classv, starttime, endtime, link, linktype, picture, order, call) {
        //admin banneradd 新增 #29 banner管理		TOP ↑
        /*
name：banner名称
	location:app/pc  展示位置
	class:xx   年级   app的时候需要提供
	starttime：开始时间   unix时间戳  1552220562
	endtime：结束时间   unix时间戳    1552220562
	linktype:internal/extenal
	link:网址
	picture：图片 (fid)
    order：1  排序

*/
        var attr = {
            "obj": "admin",
            "act": "banneradd",
            name: name,
            location: location,
            class: classv,
            starttime: starttime,
            endtime: endtime,
            link: link,
            linktype: linktype,
            picture: picture,
            order: order,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_bannermodify: function (id, name, location, classv, starttime, endtime, link, linktype, picture, order, call) {
        //admin bannermodify 修改 #29 banner管理		TOP ↑
        //
        //输入：
        //	id:o15107993142743439674
        //	name：banner名称
        //	location:app/pc  展示位置
        //	class:xx   年级
        //	starttime：开始时间   unix时间戳  1552220562
        //	endtime：结束时间   unix时间戳   1552220562
        //	linktype:internal/extenal
        //	link:网址
        //	picture：图片 (fid)
        //
        //    name：banner名称
        //	location:app/pc  展示位置
        //	class:xx   年级   app的时候需要提供
        //	starttime：开始时间   unix时间戳  1552220562
        //	endtime：结束时间   unix时间戳    1552220562
        //	linktype:internal/extenal
        //	link:网址
        //	picture：图片 (fid)
        //    order：1  排序
        //
        //输出：
        //   info:


        var attr = {
            "obj": "admin",
            "act": "bannermodify",
            id: id,
            name: name,
            location: location,
            class: classv,
            starttime: starttime,
            endtime: endtime,
            link: link,
            linktype: linktype,
            picture: picture,
            order: order,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },



    admin_accountlist: function (call) {
        //账号列表
        var attr = {
            "obj": "admin",
            "act": "accountlist"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_addaccount: function (name, pwd, call) {
        //添加账号
        var attr = {
            "obj": "admin",
            "act": "addaccount",
            name: name,
            password: pwd
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_delaccount: function (id, call) {
        //删除账号
        var attr = {
            "obj": "admin",
            "act": "delaccount",
            id: id
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_changepasswd: function (passwd_old, passwd_new, passwd_confirm, call) {
        //修改账号
        var attr = {
            "obj": "admin",
            "act": "changepasswd",
            passwd_old: passwd_old, // 旧密码
            passwd_new: passwd_new, // 新密码
            passwd_confirm: passwd_confirm //确认密码
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_rollpicture: function (picid, link, flag, call) {
        //轮播图片
        var attr = {
            "obj": "admin",
            "act": "rollpicture",
            picid: picid, // 图片id
            link: link, // 链接地址
            flag: flag //roll1/roll2/roll3   轮播图标识
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_readrollpicture: function (call) {
        //获取轮播图片
        var attr = {
            "obj": "admin",
            "act": "readrollpicture"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_producecode: function (value, number, deadline_time, call) {
        //产生提取号码
        var attr = {
            "obj": "admin",
            "act": "producecode",
            value: value, // 500/1000/3000  面值
            number: number, //数量
            deadline_time: deadline_time //有效期
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_codelist: function (totalpage, presentpage, amount, call) {
        //提取号码列表
        var attr = {
            "obj": "admin",
            "act": "codelist",
            totalpage: totalpage, //总页面数      (presentpage和totalpage和amount都输入0，刷新数据)
            presentpage: presentpage, //要显示的页码
            amount: amount, //条目总数
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_delcode: function (id, call) {
        //删除提取号码
        var attr = {
            "obj": "admin",
            "act": "delcode",
            id: id
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_searchcode: function (code, call) {
        //搜索提取号码
        var attr = {
            "obj": "admin",
            "act": "searchcode",
            code: code
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_setcode: function (id, status, call) {
        //设置提取号码状态
        var attr = {
            "obj": "admin",
            "act": "setcode",
            id: id,
            status: status //失效/有效/已使用  disable/enable/used
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_addgoods: function (id, name, weight, deadline, time, value, content, picture, call) {
        //添加商品
        var attr = {
            "obj": "admin",
            "act": "addgoods",
            name: name, // 商品名称
            weight: weight, // 净重
            deadline: deadline, //保质期
            time: time, //生产日期
            value: value, //价格
            content: content, //商品描述
            picture: picture //[o14081748217135689258,o14477397324317851066,...]
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_modifygoods: function (id, name, weight, deadline, time, value, content, picture, call) {
        //添加商品 ---覆盖式修改
        var attr = {
            "obj": "admin",
            "act": "modifygoods",
            "id": id,
            name: name, // 商品名称
            weight: weight, // 净重
            deadline: deadline, //保质期
            time: time, //生产日期
            value: value, //价格
            content: content, //商品描述
            picture: picture //[o14081748217135689258,o14477397324317851066,...]
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_goodslist: function (content, totalpage, presentpage, amount, call) {
        //提取商品 号码列表
        var attr = {
            "obj": "admin",
            "act": "goodslist",
            totalpage: totalpage, //总页面数      (presentpage和totalpage和amount都输入0，刷新数据)
            presentpage: presentpage, //要显示的页码
            amount: amount, //条目总数
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_searchgoods: function (content, totalpage, presentpage, amount, call) {
        //搜索商品
        var attr = {
            "obj": "admin",
            "act": "searchgoods",
            content: content,
            totalpage: totalpage, //总页面数      (presentpage和totalpage和amount都输入0，刷新数据)
            presentpage: presentpage, //要显示的页码
            amount: amount, //条目总数
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_orderslist: function (totalpage, presentpage, amount, call) {
        //订单列表
        var attr = {
            "obj": "admin",
            "act": "orderslist",
            totalpage: totalpage, //总页面数      (presentpage和totalpage和amount都输入0，刷新数据)
            presentpage: presentpage, //要显示的页码
            amount: amount, //条目总数
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_setorder: function (id, status, call) {
        //设置订单状态
        var attr = {
            "obj": "admin",
            "act": "setorder",
            id: id,
            status: status // unsend/send  待发货/已发货
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_delgoods: function (id, call) {
        //删除商品
        var attr = {
            "obj": "admin",
            "act": "delgoods",
            id: id
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    uploadChuan: function (attr, call) {
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    smscodeGet: function (phone, call) {
        var attr = {
            "obj": "person",
            "act": "smscodeGet",
            "phone": phone,
            "get_type": "register"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_discouponadd: function (attr,call) { // 新增优惠卷
        attr["obj"] = "admin"
        attr["act"] = "discouponadd"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_discouponmodify: function (attr,call) { // 修改优惠卷
        attr["obj"] = "admin"
        attr["act"] = "discouponmodify"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_discouponlist : function (attr,call) { // 优惠卷列表
        attr["obj"] = "admin"
        attr["act"] = "discouponlist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_claprolist: function (call) { // 获取新增优惠券学科
        var attr = {}
        attr["obj"] = "admin"
        attr["act"] = "claprolist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_discourselist: function (attr, call) { // 获取新增优惠券课程
        attr["obj"] = "admin"
        attr["act"] = "discourselist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_subjectlist: function (call) { // 获取新增优惠券课程
        var attr ={}
        attr["obj"] = "admin"
        attr["act"] = "subjectlist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_mycourselist: function (attr, call) { // 获取我的课表
        attr["obj"] = "admin"
        attr["act"] = "mycourselist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_coursepushlink: function (attr, call) { // 获取我的课表直播地址
        attr["obj"] = "admin"
        attr["act"] = "coursepushlink"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_coursesetinfo: function (attr, call) { // 备课
        attr["obj"] = "admin"
        attr["act"] = "coursesetinfo"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_getloadlink: function (attr, call) { // 备课
        attr["obj"] = "admin"
        attr["act"] = "getloadlink"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_setloadlink: function (attr, call) { // 备课
        attr["obj"] = "admin"
        attr["act"] = "setloadlink"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_statisticslist: function (attr, call) { // 上课情况
        attr["obj"] = "admin"
        attr["act"] = "statisticslist"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_statisticsdetail: function (attr, call) { // 上课情况
        attr["obj"] = "admin"
        attr["act"] = "statisticsdetail"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_statisticsexam: function (attr, call) { // 上课情况
        attr["obj"] = "admin"
        attr["act"] = "statisticsexam"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_coursereadinfo: function (attr, call) { // 上课情况
        attr["obj"] = "admin"
        attr["act"] = "coursereadinfo"
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    saveSeason1:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {

  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });


});
},

seasonlist:function(attr,call){

server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {

  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });


});
}



}
