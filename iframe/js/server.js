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
            "login_name": account,
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

    admin_classlist: function (call) {
        //班级列表 #29 banner管理
        var attr = {
            "obj": "admin",
            "act": "classlist"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_operatorlist: function (name, status, call) {
        //dmin operatorlist 列表 #28 人员管理运营人员		TOP ↑
        //active/unactive     不过滤就为空
        var attr = {
            "obj": "admin",
            "act": "operatorlist",
            name: name,
            status: status,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_operatoradd: function (name, gender, status, phone, passwd, call) {
        //admin operatoradd 新增 #28 人员管理运营人员
        //lady/gentle  性别
        //active/unactive 在职/离职
        var attr = {
            "obj": "admin",
            "act": "operatoradd",
            name: name,
            gender: gender,
            status: status,
            phone: phone,
            passwd: passwd
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_operatormodify: function (id, name, gender, status, phone, passwd, call) {
        //admin operatormodify 修改 #28 人员管理运营人员		TOP ↑
        //lady/gentle  性别
        //active/unactive 在职/离职
        var attr = {
            "obj": "admin",
            "act": "operatormodify",
            id: id,
            name: name,
            gender: gender,
            status: status,
            phone: phone,
            passwd: passwd
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_organizelist: function (call) {
        //admin organizelist 列表 #23 学级学科管理
        var attr = {
            "obj": "admin",
            "act": "organizelist"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_organizeadd: function (type, name, order, id, call) {
        //admin organizeadd 添加 #23 学级学科管理		TOP ↑
        /*
输入:
    type:phase/class/subject  阶段/年级/学科
	phase需要的参数：
	   name：名称
	   order：1
	   
	class需要的参数：
	   id:o15107993142743439674  phase的标识
	   name：名称
	   order：1
	   
	subject需要的参数：
	   id:o15107993142743439674  class的标识
	   name：名称
	   order：1
       */
        var attr = {
            "obj": "admin",
            "act": "organizeadd",
            type: type,
            name: name,
            order: order,
        }
        if (type != "phase") {
            attr.id = id;
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_organizedel: function (id, call) {
        //admin organizedel 删除 #23 学级学科管理
        var attr = {
            "obj": "admin",
            "act": "organizedel",
            id: id
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_organizemodify: function (id, name, order, call) {
        //admin organizemodify 修改 #23 学级学科管理		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "organizemodify",
            id: id,
            name: name,
            order: order,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_teacherlist: function (name, status, page_num, page_size, call) {
        //admin teacherlist 列表 #27 人员管理老师
        var attr = {
            "obj": "admin",
            "act": "teacherlist",
            status: status, //active/unactive     不过滤就为空
            name: name,
            page_num: page_num,
            page_size: page_size
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_teachermodify: function (id, name, gender, phone, passwd, classsubject, status, picture, certify, description, call) {
        //admin teachermodify 修改 #27 人员管理老师		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "teachermodify",
            id: id,
            name: name,
            gender: gender, //lady/gentle  性别
            phone: phone,
            passwd: passwd,
            classsubject: classsubject,
            status: status, //active/unactive 在职/离职
            picture: picture,
            certify: certify,
            description: description,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_teacheradd: function (name, gender, phone, passwd, classsubject, status, picture, certify, description, call) {
        //admin teacheradd 新增 #27 人员管理老师		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "teacheradd",
            name: name,
            gender: gender, //lady/gentle  性别
            phone: phone,
            passwd: passwd,
            classsubject: classsubject,
            status: status, //active/unactive 在职/离职
            picture: picture,
            certify: certify,
            description: description,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_claprolist: function (call) {
        //admin claprolist 班级+学科列表 #24 课程列表
        var attr = {
            "obj": "admin",
            "act": "claprolist"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_seasonlist: function (call) {
        //admin seasonlist 列表 #22 季节管理 #24 课程列表		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "seasonlist"
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_courselist: function (obj, call) {
        //admin courselist 列表 #24 课程列表
        var attr = {
            "obj": "admin",
            "act": "courselist"
        }
        for (var i in obj) {
            attr[i] = obj[i];
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },
    admin_coursemodify: function (obj, call) {
        //admin coursemodify 修改 #24 课程列表
        var attr = {
            "obj": "admin",
            "act": "coursemodify"
        }
        for (var i in obj) {
            attr[i] = obj[i];
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },


    admin_coursesell: function (id, status, call) {
        //admin coursesell 上架/下架 #24 课程列表		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "coursesell",
            id: id,
            status: status,
        }
        getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
    },

    admin_courseadd: function (obj, call) {
        //admin courseadd 新增 #24 课程列表		TOP ↑
        var attr = {
            "obj": "admin",
            "act": "courseadd"
        }
        for (var i in obj) {
            attr[i] = obj[i];
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
    }
}
