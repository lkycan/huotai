//cookie

function setCookie(c_name, value, expiredays){  
 　　　　var exdate=new Date();  
　　　　exdate.setDate(exdate.getDate() + expiredays);  
　　　　document.cookie=c_name+ "=" + value + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/"; 
 　　}  
   
 //读取cookie
 function getCookie(name){
     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
     if(arr = document.cookie.match(reg)){
         return (arr[2]);     
     }else{
         return null;     
     }
 };


 function delCookie(name){
     var exp = new Date();
     exp.setTime(exp.getTime() - 1);
     var cval = getCookie(name);
     if(cval != null){
         document.cookie= name + "="+cval+";expires=" + exp.toGMTString()+";path=/;"
     }
 };
 function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }    
}