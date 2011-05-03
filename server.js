var http = require("http");
var url = require("url");

function start_server(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url).query;
    var method = request.method;
    //method = '';
    console.log(method + " request for " + pathname + " received." + " With params " + params);

    route(handle, params, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start_server = start_server;
