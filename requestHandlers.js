var exec = require("child_process").exec;

function start(p,response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(stdout);
    response.end();
  });
}

function sleep(milliSeconds) {
  var startTime = new Date().getTime(); // get the current time
  while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}

function find(p,response) {
//SHOWS NON-BLOCKING WITH TIMEOUT
  console.log("Request handler 'find' was called.");

  exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(stdout);
      response.end();
    });
}

function ls(p,response) {
//SHOW BLOCKING SLEEP
  console.log("Request handler 'ls' was called.");
  sleep(10000);
  exec("ls -lh", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/html"});
    content = stdout.replace(/\n/gi,'<br/>');
    response.write(content);
    response.end();
  });
}

function cmd(cmd, response) {
  console.log("Request handler 'cmd' with params " + cmd + " was called.");
  cmd = cmd.replace(/%20/gi,' ');
  cmd = cmd.replace(/\+/gi,' ');
  cmd = cmd.replace(/%2F/gi,'/');
  if (cmd == ''){
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Enter A Command<form method='GET' action='/cmd'><input type='text' name='cmd' /></form>");
    response.end();
  }else{
    exec(cmd.split('=')[1], function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/html"});
      content = stdout.replace(/\n/gi,'<br/>');
      response.write("<form method='GET' action='/cmd'>Enter a Command: <input type='text' name='cmd' /></form>");
      response.write("Console Output:<hr>" + content + "<hr>");
      response.write("Enter A Command<form method='GET' action='/cmd'><input type='text' name='cmd' /></form>");
      response.end();
    });
  }
}

function upload(p,response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hello Upload");
  response.end();
}

exports.find = find;
exports.cmd = cmd;
exports.ls = ls;
exports.start = start;
exports.upload = upload;
