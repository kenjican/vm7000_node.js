/*
  This program is for integrate ten VM7000 paperless recorders to present all the PV on 
one screen at all devices(OS independent).Commuicate with VM7000 by TCP Modbus, gather information and combine
into one data chunck then send to Chrome.

  It could make sound by speaker connects to server(Raspberry Pi) when alert happens,and send SMS to notify related staffs.History data could be queried by settting cretiria then presented in any kind of charts(echarts).

Auther : Kenji Chen
Version : 1.0
Copy right : .....who cares
*/
var util = require('util');
var value;
var net = require('net');
var host = '192.168.0.199';
var port = 502;
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.createConnection('localhost','VM7000');

var vmschema = new mongoose.Schema({
  //Rdate:{type:Number,default:Date.now},
  Model_No:String,
  pv:[]
});

var vms = db.model('vms',vmschema);


var mbs = new Buffer([0x00,0x01,0x00,0x00,0x00,0x06,0x01,0x04,0x00,0x64,0x00,0x06]);

var client = new net.Socket();
var getvalue = function() {client.write(mbs);}

client.connect(port,host,function(){
//	console.log("connected to vm7000");
});

client.on('error',function(err){
  console.error(err.code);
});

client.on('data',function(data){
	//console.log(data);
  var vm = new vms({Model_No:'VM1',pv:[]});
  var temp;
  for(var i=0;i<6;i++){
    temp = data.readUInt16BE(9+i*2);
    if(temp < 32767){
      vm.pv.push(temp/100);
    }else{
      vm.pv.push((temp-65536)/100);
    }
      //console.log(vm.pv);
  }
  vm.save();
	value = data;
  //vms.insert(vm);
 // console.log(vm);
});

setInterval(getvalue,1000);


/*
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost',27017,{auto_reconnection:true});
var db = new mongodb.Db('VM7000',server,{safe:true});
var vms;
db.open(function(err,db){
db.collection('vms',{safe:true},function(err,collection){
  vms = collection;
  debugger;
 // collection.insert({'test':'test1'},{safe:true},function(err,result){
//  });
});});
*/
var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.sendFile('/home/pi/vm7000_node.js/vm7000.htm');
}
);

app.get('/getvalue',function(req,res){
  //res.writeHead(200,{'content-Type':'text/html','Access-Control-Allow-Origin':'*'});
  res.send(value);
  res.end;
});

app.get('/gethis/:fDate/:tDate',function(req,res){
  vms.find({'_id':{$gt:(req.params.fDate + '0000000000000000'),$lt:(req.params.tDate + '0000000000000000')}}).exec(function(err,his){

//  vms.find().where('_id').gt(req.params.fDate + '0000000000000000').exec(function(err,his){
    if (err) throw err;
  res.send(his);
  res.end;
  });
 });

app.get('/gethisto',function(req, res){
  var arr = new Array();
  var j=0;
  for(i=0;i<1000;i++){
     a = (0x58699800+i*30).toString(16) + '0000000000000000';
     vms.findOne({'_id':{$gt:a}}).exec(function(err,his){
        if(!err){
          
         arr[j] = his;
          j++;
         //console.log(arr);
         //console.log(his);
         //console.log(i);
         if(j===1000){
           //console.log('i===9');
           res.send(arr);
           res.end;
         }
        }
     });
//       if(i===9){
//         console.log(arr);
//         res.send(arr);
//         res.end;
//       }
  }
  //console.log(arr);
  //res.send(arr);
  //res.end;
});

app.get('/gethist/:fdate/:recnum/:interv',function(req,res){
//  mongoose.connect('mongodb://localhost:27017/VM7000',function(){
var arr = new Array();
var j = 0;
for(i=0;i<parseInt(req.params.recnum);i++){
  a = (parseInt(req.params.fdate) + i* parseInt(req.params.interv)).toString(16) + '0000000000000000';
  vms.findOne({'_id':{$gt:a}}).exec(function(err,his){
     if(!err){
       arr[j] = his;
       j++;
     if(j===parseInt(req.params.recnum)){
       res.send(arr);
       res.end;
     }
     }
  });
}
});
//  mongoose.connection.db.eval('gethist(' + req.params.fdate +',' +req.params.recnum + ',' + req.params.inverv + ')',function(err,retval){console.log(retval);});
 
//});



app.listen(8080);


function alert(pv,diff){
  if(Math.max.apply(null,pv) - Math.min.apply(null.pv) > diff){
    
 }
};

