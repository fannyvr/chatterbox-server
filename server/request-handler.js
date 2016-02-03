exports.requestHandler = function(request, response) {
  var storage = require("./data.js");
  var url = request.url;

  console.log("Serving request type " + request.method + " for url " + url);

  var statusCode = 200;

  var headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    "Content-Type": "application/json"
  };

  if (url === '/classes/room1') {
    response.writeHead(statusCode, headers);


    if (request.method === "GET") {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(storage.data));

    }
    if (request.method === "POST") {
      response.writeHead(201, headers);
      var body = "";

      request.on('data', function(chunk) {
        body += chunk;
      });
      request.on('end', function() {
        storage.data.results.push(JSON.parse(body));
        console.log("db", storage.data);
        response.end(JSON.stringify(storage.data.results));
      });

    }
    if (request.method === "OPTIONS") {
      response.writeHead(statusCode, headers);
      response.end(null);
    }

  } else {
    response.writeHead(404, headers);
    response.end();
  }

};