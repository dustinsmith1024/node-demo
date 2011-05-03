var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/ls"] = requestHandlers.ls;
handle["/upload"] = requestHandlers.upload;
handle["/cmd"] = requestHandlers.cmd;
handle["/find"] = requestHandlers.find;
server.start_server(router.route, handle);
