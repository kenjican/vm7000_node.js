
$(document).ready(function(){
var chart = document.getElementById('vmchart');
var charData = echarts.init(chart);

charData.showLoading();
/*  $('#fDate').datetimepicker({
   timeFormat:'HH:mm:ss' 
  });
  $('#tDate').datetimepicker({
   timeFormat:'HH:mm:ss',
  });
  */
charData.setOption({
title:{
  text:'測試靜態json檔案'
	},
tooltip:{
  trigger:'axis'
},
dataZoom:[
  {
   type:'slider',
   xAxisIndex:0,
   start:0,
  end:25
  },
  {
    type:'inside',
    xAxisIndex:0,
    start:0,
    end:25
  },
  {
    type:'slider',
    yAxisIndex:0,
    start:0,
    end:100
  },
  {
    type:'inside',
    yAxisIndex:0,
    start:0,
    end:100
  }
],
legend:{
  data:['pv1','pv2','pv3','pv4','pv5','pv6']	},
xAxis:{
  data:[]	},
yAxis:{},
series:[{
name:'pv1',
type:'line',
data:[]
},
{name:'pv2',
 type:'line',
 data:[]
},
{name:'pv3',
 type:'line',
 data:[]
},
{name:'pv4',
 type:'line',
 data:[]
},
{name:'pv5',
 type:'line',
 data:[]
 },
{name:'pv6',
 type:'bar',
 data:[]
}
]
});

$.get('test1.json',function(data,status){
  //console.log(data.Rdate);
  charData.hideLoading();
  var dt = new Date(0);
  var dat=[];
  var pv1=[],pv2=[],pv3=[],pv4=[],pv5=[],pv6=[];
  for(i=0;i<data.length;i++){
      dt.setTime(parseInt((data[i]._id).slice(0,8),16)*1000);
     dat[i] = dt.toString();//    dat[i] = (data[i]._id).slice(0,8);
     pv1[i] = data[i].pv[0];
     pv2[i] = data[i].pv[1];
     pv3[i] = data[i].pv[2];
     pv4[i] = data[i].pv[3];
     pv5[i] = data[i].pv[4];
     pv6[i] = data[i].pv[5];
  }
  charData.setOption({
    xAxis:{data:dat},
    series:[{
      name:'pv1',
      data:pv1},
    {name:'pv2',
    data:pv2},
     {name:'pv3',
      data:pv3},
    {name:'pv4',
      data:pv4},
    {name:'pv5',
    data:pv5},
     {name:'pv6',
      data:pv6}
    ]
  });
		});

});
function gethis(){
  charData.showLoading();
  var a = new Date($('#fDate').val());
  var b = new Date($('#tDate').val());
  gethistory('/gethis/' + (a.getTime()/1000).toString(16) + '/' + (b.getTime()/1000).toString(16));
  //alert((a.getTime()/1000).toString(16));
}

var gethistory = function(fdate){$.get(fdate,function(data,status){
  //console.log(data.Rdate);
  charData.hideLoading();
  var dt = new Date(0);
  var tempdt;
  var dat=[];
  var pv1=[],pv2=[],pv3=[],pv4=[],pv5=[],pv6=[];
  for(i=0;i<data.length;i++){
     dt.setTime(parseInt((data[i]._id).slice(0,8),16)*1000);
     dat[i] = dt.toString();//(data[i]._id).slice(0,8);
     pv1[i] = data[i].pv[0];
     pv2[i] = data[i].pv[1];
     pv3[i] = data[i].pv[2];
     pv4[i] = data[i].pv[3];
     pv5[i] = data[i].pv[4];
     pv6[i] = data[i].pv[5];
  }
  charData.setOption({
    xAxis:{data:dat},
    series:[{
      name:'pv1',
      data:pv1},
    {name:'pv2',
    data:pv2},
     {name:'pv3',
      data:pv3},
    {name:'pv4',
      data:pv4},
    {name:'pv5',
    data:pv5},
     {name:'pv6',
      data:pv6}
    ]
  });
		});
}

function caldate(){
  var a,b;
  a = new Date($('#fDate').val());
  b = new Date($('#tDate').val());
  alert(((b.getTime() - a.getTime()))/1000/(parseInt($('#TimeInterval').val())));
}

