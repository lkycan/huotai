var search = decodeURI(location.search);
var searchObj = {};
if (search != "") {
    search.substr(1, search.length)
        .split("&").forEach(function (data) {
            var datas = data.split("=");
            searchObj[datas[0]] = datas[1];
        });
}
console.log(searchObj);

var util = {
    init: function (startCall) {
        startApiconn();
        apiconn.wsUri ="ws://47.97.187.6:51719/clx";// "ws://39.108.219.7:51717/znyx"; // "ws://116.62.127.156:51717/xgzx";
        var server_infoCall = function () {
            //这是入口
            console.info("start!!");
            if (startCall) {
                startCall();
            }
        }

        apiCallback["server_info"] = function () {
            server_infoCall();

        }
        apiconn.connect();

    },
    ajax: function (url, call) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (call) {
                    call(xhr.responseText);
                }
            }
        }
        xhr.open('get', url);
        xhr.send(null);
    },
    uploadImgFile: function () {

    }
}



var gzzmObj = [

]
//移除证明
function yichuzm(num) {
    if (num > 0) {
        gzzmObj.splice(num - 1, 1);
    }

    $("#gzmzid1,#gzmzid2,#gzmzid3,#gzmzid4,#gzmzid5,#gzmzid6").hide();
    $("#gzmzid1 .join_xg_4_1_1").attr("src", "");
    $("#gzmzid2 .join_xg_4_1_1").attr("src", "");
    $("#gzmzid3 .join_xg_4_1_1").attr("src", "");
    $("#gzmzid4 .join_xg_4_1_1").attr("src", "");
    $("#gzmzid5 .join_xg_4_1_1").attr("src", "");
    $("#gzmzid6 .join_xg_4_1_1").attr("src", "");

    var lens = 0;
    for (var i = 0; i < gzzmObj.length; i++) {
        var nums = i + 1;
        $("#gzmzid" + nums).show();
        if (gzzmObj[i].fid != "") {
            lens++;
            $("#gzmzid" + nums + " .join_xg_4_1_1").attr("src", apiInfoData.server_info.download_path + gzzmObj[i].fid);
        }
    }

    if (lens < 6) {
        document.getElementById("imgfile8").style.display = "block";
    } else {
        document.getElementById("imgfile8").style.display = "none";
    }

}

function addZm(fid) {
    //添加工作证明
    if (gzzmObj.length < 6) {
        var fids = "";
        if (fid && fid != "") {
            fids = fid;
        }
        gzzmObj.push({
            fid: fids
        });
        yichuzm();
    } else {
        document.getElementById("imgfile8").style.display = "none";
    }
}

function changeLoad(files, call) {
    var fileVal = false,
        fileName = "";
    var file = files[0];
    var reader = new FileReader();
    //将文件以Data URL形式读入页面  
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        fileVal = this.result;
        fileName = file.name;
        submit(this.result, file.name, function (fid) {
            var src = apiInfoData.server_info.download_path + fid;
            console.log("fid:", fid, src);
            if (call) {
                call(src, fid);
            }

            //            
            //            if (imgDom == "imgfile8") {
            //                //添加
            //                addZm(fid);
            //            } else {
            //                imgDom.src = apiInfoData.server_info.download_path + fid;
            //                if (zmid > 0) {
            //                    gzzmObj[zmid - 1].fid = fid;
            //                }
            //                if (keys != undefined) {
            //                    uploadKeys[keys] = fid;
            //                }
            //            }
        });
    }
}


function initbind(inputDom, imgDom, zmid, keys) {
    var fileVal = false,
        fileName = "";
    inputDom.addEventListener("change", function () {
        var file = this.files[0];
        var reader = new FileReader();
        //将文件以Data URL形式读入页面  
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $("#login_touxiang img").src = this.result;
            fileVal = this.result;
            fileName = file.name;
            submit(this.result, file.name, function (fid) {
                if (imgDom == "imgfile8") {
                    //添加
                    addZm(fid);
                } else {
                    imgDom.src = apiInfoData.server_info.download_path + fid;
                    if (zmid > 0) {
                        gzzmObj[zmid - 1].fid = fid;
                    }
                    if (keys != undefined) {
                        uploadKeys[keys] = fid;
                    }
                }
            });
        }
        inputDom.value = "";
    }, false);


}

var uploadKeys = {
    "shenfen1": "", //身份证正面
    "shenfen2": "", //手持身份证
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

function submit(dataurl, types, calls) {
    var blob = dataURLtoBlob(dataurl);
    //使用ajax发送
    var fd = new FormData();
    fd.append("local_file", blob, types);
    fd.append("proj", apiInfoData.server_info.proj);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var datas = JSON.parse(xhr.responseText);
            console.log("来了:", datas, datas.fid);
            if (calls) {
                calls(datas.fid);
            }
        }
    }
    xhr.open('POST', apiInfoData.server_info.upload_to, true);
    xhr.send(fd);
}


//logodiban
var imgKey = {};

function loadImg(src, call) {
    var img = new Image();
    img.onload = function () {
        imgKey[src] = src;
        if (call) {
            call();
        }
    }
    img.src = "img/load/" + src + ".png";
}
