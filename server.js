// simple express server

var
  app, server,
  express = require('express'),
  path = require('path'),
  host = process.env.HOST || '0.0.0.0',
  port = process.env.PORT || 3007,
  root = path.resolve(__dirname),
  https = require('https'),
  http = require('http'),
  util = require('util'),
  sendSeekable = require('send-seekable'),
  fs = require('fs')
  ;
/*
const options = {
  key: fs.readFileSync('sslcert/agent2-key.pem'),
  cert: fs.readFileSync('sslcert/agent2-cert.pem')
}*/

app = express();
app.use(sendSeekable);
app.use(function(req, res, next) { console.log(req.url); next(); });


app.use("/*.mp4*",function(req,res,next){
  console.log('video route called');
   var filePath = root + '/build' + req.baseUrl;
   console.log(filePath);
   //console.log(util.inspect(req));
   var video = fs.createReadStream(filePath);
   fs.stat(filePath, function(err,stats){
    console.log(util.inspect(stats));
      var status = req.headers['range'] ? 206 : 200;
      console.log("response status: ",status);
      res.status(status);
      res.sendSeekable(video,{
        type: 'video/mp4',
        length: stats.size
      });
   });
   

}); 


app.use(express.static(root + '/build'));
//server = app.listen(port, host, serverStarted); //old server
server = http.createServer(app).listen(port);
//server = https.createServer(options, app).listen(443); //if ssl is option


function serverStarted () {
  console.log('Server started', host, port);
  console.log('Root directory', root);
  console.log('Press Ctrl+C to exit...\n');
}
serverStarted();
server.on('connect',() => console.log('connection made'));