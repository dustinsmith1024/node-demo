function route(handle, params, pathname, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](params,response);
  } else {
    console.log("No request handler found for " + pathname);
    //response.writeHead(404, {"Content-Type": "text/html"});
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Sorry we don't support " + pathname + " yet.");
    response.end();
  }
}

exports.route = route;
