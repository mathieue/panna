var http = require('http')
  , server = http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*'); 
});

server.on('request', function (serverReq,
    serverResp) {

  var host = 'dev.openbeelab.org'
  	, port = 5984
    , opts
    , clientRequest
    , handle;

  handle = setTimeout(function () {
    serverResp.writeHead(500, {});
    serverResp.end('dammit');
  }, 5000);


  serverReq.headers.host = host;

  opts = {
    host: host
  , port: port
  , path: serverReq.url
  , headers: serverReq.headers
  };
  clientReq = http.request(opts);

  clientReq.on('response', function (clientResp) {
    serverResp.writeHead(clientResp.statusCode,
      clientResp.headers);
    clientResp.on('data', function (data) {
      serverResp.write(data);
    });
    clientResp.on('end', function () {
      clearTimeout(handle);
      serverResp.end();
    });
  });
  console.log('requesting ' + serverReq.url);

  clientReq.end();
});

server.listen(4000, 'localhost');

process.on('uncaughtException', function (err) {
  console.log(err.message);
});
