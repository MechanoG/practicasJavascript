import {createServer} from "node:http";

let server = createServer((request, response) => {
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write>(`
        <h1>Hello!</h1>
        <p>You asked for <code>${request.url}</code></p>`);
    response.end(); 
});
server.listen(800);
console.log("Listening! (port 8000)");