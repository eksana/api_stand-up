import http from "node:http";
import fs from "node:fs/promises"

const PORT = 8080;

const startServer = async () => {

    const data = await fs.readFile('package.json', 'utf-8');
    console.log(data);

    //const http = require("node:http");

    //console.log(http);
    http.createServer(async (req, res) => {
        if (req.method === "GET" && req.url === "/comedians") {

            try {
                const data = await fs.readFile('comedians.json', 'utf-8')
                res.writeHead(200, {
                    //"Content-Type": "text/plain; charset=utf-8",
                    "Content-Type": "text/json; charset=utf-8",
                    "Access-control-Allow-Origin": "*",
                });
                //res.end("<h1>hello, привет</h1>");
                res.end(data);
            } catch (error) {
                res.writeHead(500, {
                    "Content-Type": "text/plain; charset=utf-8",
                });
                res.end(`Ошибка сервера: ${error}`)
            }


        } else {
            res.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8",
            });
            res.end("не найдено");
        }

    })
        .listen(PORT);

    console.log(`Серевер запущен на http://localhost:${PORT}`);

}
startServer();



