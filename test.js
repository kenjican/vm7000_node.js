var http = require('http');
var server = http.createServer();
var value;
server.on('request',function(req,res){
	res.writeHead(200,{'content-Type':'text/html'});
	res.write(value.toString('hex'));
	res.end();
});
server.listen(80,'0.0.0.0');


var net = require('net');
var host = '192.168.0.199';
var port = 502;
var mbs = new Buffer([0x00,0x01,0x00,0x00,0x00,0x06,0x01,0x04,0x00,0x64,0x00,0x06]);

var client = new net.Socket();
var getvalue = function() {client.write(mbs);}

client.connect(port,host,function(){
	console.log("connected to vm7000");
});

client.on('data',function(data){
	console.log(data);
	value = data;
});

setInterval(getvalue,1000);