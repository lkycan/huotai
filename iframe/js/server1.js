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
 //公共方法。
    publicMethod:function(attr,call){
        server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
         if (data.ustr != undefined && data.ustr != "") {
             alert("登录失败！")
         }else{
          getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

      }
  });
    },

seasonlist:function(attr,call){
   
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

}
});
},

orderlist :function(attr,call){
   
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

}
});
},

ordertransfer:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

}
});    
},


claprolist:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

}
});    
}, 
userList:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });

}
});    
},

showAll:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
}
});    
},
userorderdetail:function(attr,call){
server.login(   localStorage.getItem("login_name"),localStorage.getItem("login_passwd"),function (data) {
   if (data.ustr != undefined && data.ustr != "") {
                       alert("登录失败！")
                }else{
  getData(attr, function (data) {
            if (call) {
                call(data);
            }
        });
}
});    
}
}
