const http = require('http');
const app = require("./app");
 const Connection = require("./db");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
Connection();
server.listen(port,()=>{
  console.log("server is running at port at " + `${port}`);
});
