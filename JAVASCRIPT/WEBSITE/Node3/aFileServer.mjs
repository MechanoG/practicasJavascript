import {createServer} from "node:http";
import {createReadStream, createWriteStream} from "node:fs";
import {stat, readdir} from "node:fs/promises";
import {lookup} from "mime-types";
import { rmdir, unlink } from "node:fs/promises";

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request).catch(error => {
    if (error.status != null) return error;
    return {body: String(error), status: 500};
  }).then(({body, status = 200, type = "text/plain"}) => {
    response.writeHead(status, {"Content-Type": type});
    if (body?.pipe) body.pipe(response);
    else response.end(body);
  });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  };
}
//Request a file method
methods.GET = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 404, body: "File not found"};
  }
  if (stats.isDirectory()) {
    return {body: (await readdir(path)).join("\n")};
  } else {
    return {body: createReadStream(path),
            type: lookup(path)};
  }
};

///Code To Delete request
methods.DELETE = async function (request){
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch(error){
      if (error.code != "ENOENT") throw error;
      else return {status : 204};
    }
    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);
    return {return: 204};
};

//Handler for Put request
function pipeStream(from, to){
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.PUT = async function (request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return {status: 204};
}