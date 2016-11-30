

var xmlhttp;
xmlhttp = new XMLHttpRequest();

var getvalue = function getvalue(){
  xmlhttp.open("GET","http://192.168.0.7:8080",true);
 // xmlhttp.timeout = 500;
//  xmlhttp.ontimeour = function(){xmlhttp.abort();};
  xmlhttp.responseType = "arraybuffer";
  xmlhttp.send();
};


xmlhttp.onreadystatechange = function(){
  if(xmlhttp.readyState == 4 && xmlhttp.status==200){
    var v = new DataView(xmlhttp.response);
    var t = document.getElementById("VM1");
    for (var i =0;i<6;i++){
        var b = v.getUint16(i*2+9);
       if(b<32767){
	  t.rows[i].cells[1].innerHTML = (b/100).toFixed(2);
    }else{
	  t.rows[i].cells[1].innerHTML = ((b-65536)/100).toFixed(2);
    }
/*
    t.rows[0].cells[1].innerHTML = (v.getUint16(9,false)/100).toFixed(2);
    t.rows[1].cells[1].innerHTML = (v.getUint16(11,false)/100).toFixed(2);
    t.rows[2].cells[1].innerHTML = (v.getUint16(13,false)/100).toFixed(2);
    t.rows[3].cells[1].innerHTML = (v.getUint16(15,false)/100).toFixed(2);
    t.rows[4].cells[1].innerHTML = (v.getUint16(17,false)/100).toFixed(2);
    t.rows[5].cells[1].innerHTML = (v.getUint16(19,false)/100).toFixed(2);
*/
  }}}


setInterval(getvalue,1000);

