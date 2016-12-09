/*
var http = require('http');
var server = http.createServer();
var value;
server.on('request',function(req,res){
	res.writeHead(200,{'content-Type':'text/html','Access-Control-Allow-Origin':'*'});
	res.write(value);
	res.end();
});
server.listen(8080,'0.0.0.0');
*/

var value;
var net = require('net');
var host = '192.168.0.199';
var port = 502;
var mbs = new Buffer([0x00,0x01,0x00,0x00,0x00,0x06,0x01,0x04,0x00,0x64,0x00,0x06]);

var client = new net.Socket();
var getvalue = function() {client.write(mbs);}

client.connect(port,host,function(){
//	console.log("connected to vm7000");
});

client.on('data',function(data){
	//console.log(data);
	value = data;
});

setInterval(getvalue,1000);

var mongoose = require("mongoose");
var dbhose = 'mongodb://localhost:27017/VM7000';
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


app.listen(8080);
