var app = angular.module('myApp', []);
app.controller('packageCtrl',function($scope,$timeout){
$scope.packageShow1=false;
	$scope.page_num1=0;
var page_num11=0;
var page_all11=0;
var cpt="charge_by_num"; //开始默认次数。 后续查找完更新。
var type=0; //0为次卡，1为时卡
//查询列表
$scope.names="";
//拉取套餐列表。
window.onload = function() {
	util.init(function() {
		/*查询列表  暂时隐藏*/ 

	pack_list();

	});  
};


pack_list=function(){
		var attr = { 
			"obj": "admin",
			"act": "pack_list",
		} 
		server.publicMethod(attr,function(data){

			$timeout(function() {
				cpt=data.cpt;
               if (type==0) {
               	$scope.packList=  data.pack_list;
               	$scope.cptName="次卡套餐";
               $scope.gift="赠送次数";
               	$scope.labelCount="次数";
               }else {
				$scope.packList=  data.day_list;
               	$scope.cptName="天数套餐";
               	$scope.gift="赠送天数";
               	$scope.labelCount="天数";
               }
               			}, 1);
		}); 

}



//次数新增页面弹出
$scope.newNumPackage=function(){
	if(type==0){
		cpt="charge_by_num"
	}else {
		cpt="charge_by_time"
	}
	$scope.packageShow1=false;
	$scope.newRecharge=false;
	$scope.editRecharge=false;
	$scope.count=null;
	$scope.fee=null;
	$scope.gift_count=null;

	$timeout(function() {
	if (cpt=="charge_by_num") {
	$scope.countStr="次数";
     $scope.giftCountStr="赠送次数";
	
}else{
$scope.countStr="天数";
$scope.giftCountStr="赠送天数";

}
$scope.packageShow1=true;
$scope.newRecharge=true;},1);
}
//修改页面弹出
$scope.editNumPackage=function(){
	if(type==0){
		cpt="charge_by_num"
	}else {
		cpt="charge_by_time"
	}
	console.log($scope.x);
		if ($scope.x==undefined ) {
			alert("请先选中一笔数据");
			return;	
		}
		if (cpt=="charge_by_num") {
			$scope.countStr="次数";
			$scope.giftCountStr="赠送次数";

		}else{
			$scope.countStr="天数";
			$scope.giftCountStr="赠送天数";

		}


	$scope.packageShow1=true;
	var v=  JSON.parse($scope.x);
	$scope.count=v.count;
	$scope.fee=v.fee;
	$scope.pack_id=v._id;
	$scope.gift_count=v.gift_count;
	$scope.editRecharge=true;
}
//删除页面弹出
$scope.delNumPackage=function(){
console.log($scope.x);
		if ($scope.x==undefined ) {
			alert("请先选中一笔数据");
			return;	
		}
var v=  JSON.parse($scope.x);
	
var attr = { 
		"obj": "admin",
		"act": "pack_del",
		"pack_id":v._id
	} 

server.publicMethod(attr,function(data){
		pack_list();
	});



}
//新增保存
$scope.newRecharge1=function(count,fee,gift_count){
if(type==0){
	cpt="charge_by_num"
}else {
	cpt="charge_by_time"
}
	var attr = { 
		"obj": "admin",
		"act": "pack_add",
		"ctype":cpt,
		"count":count,
		"fee":fee,
		"gift_count":gift_count
	} 
	server.publicMethod(attr,function(data){
		pack_list();
		$scope.packageShow1=false;
			$scope.newRecharge=false;
		$scope.count=null;
		$scope.fee=null;
		$scope.gift_count=null;
	});
}

//修改保存
$scope.editRecharge1=function(pack_id,count,fee,gift_count){
	var attr = { 
		"obj": "admin",
		"act": "pack_edit",
		"pack_id":pack_id,
		"ctype":cpt,
		"count":count,
		"fee":fee,
		"gift_count":gift_count
	} 
	server.publicMethod(attr,function(data){

		console.log(data)
		pack_list();
		$scope.packageShow1=false;
		$scope.editRecharge=false;
		$scope.count=null;
		$scope.fee=null;
		$scope.gift_count=null;
		$scope.pack_id=null;
	});
}
/*切换套餐*/
$scope.changeCpt=function(){
	if (type==0) {
		type=1;
	}else {
		type=0;
	}
	pack_list();
}


$scope.userorderdetail=function(order,myId){
    console.log(myId)
console.log(order);
var attr = {
	"obj": "admin",
	"act": "userorderdetail",
	"id":order.order_id,
	
	} 
	server.userorderdetail(attr,function(data){
	$timeout(function(){
		$scope.userShow1=false;
$scope.userShow2=false;
$scope.userShow3=false;
$scope.userShow4=true;
$scope.userorderdetaillist=data.info;
 	if($scope.userorderdetaillist.transfer==""){

        		$scope.isTrans=true;

        	}

 	if( $scope.userorderdetaillist.material=="true"){
        		$scope.isMatcontent=true;

        	}else{
        		$scope.isMatcontent=false;
        	}

		},1);


	});

}


        $scope.esaveOrder=function(transfername,transferid,id){

        	if(null== transfername){
        		alert("请输入物流公司信息");
        		return;
        	}
        	if(null== transferid){
        		alert("请输入物流单号信息");
        		return;
        	}

        	var attr = {
        		"obj": "admin",
        		"act": "ordertransfer",
        		"id":id,
        		"transfername":transfername,
        		"transferid":transferid

        	}   
        	server.ordertransfer(attr,function(data){
        		if(data.info=="设置成功！"){
        			alert("设置成功！");
        			$timeout(function(){
        				$scope.userorderdetaillist.transfer=transfername+","+transferid;
        			},1);
        			$scope.isTrans=false;
        		};	$scope.newOrder2=false;
        		$scope.transfername="";
        		$scope.transferid="";
        	});
        }
});
