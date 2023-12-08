import http from "node:http";
import fs from "node:fs/promises"

const PORT = 8080;
const COMEDIANS = './comedians.json';
const CLIENTS = './clients.json';

const checkFiles = async () => {
    try {
        await fs.access(COMEDIANS)
    } catch (error) {
        console.log(`Файл ${COMEDIANS} не найден`);
        return false
    }

    try {
        await fs.access(CLIENTS)
    } catch (error) {

        await fs.writeFile(CLIENTS, JSON.stringify([]));
        console.log(`Файл ${CLIENTS} был создан`);
        return false
    }
    return true;

}

const startServer = async () => {
    if (!(await checkFiles())) {
        return;

    }
    const data = await fs.readFile('package.json', 'utf-8');
    console.log(data);

    //const http = require("node:http");

    //console.log(http);
    http.createServer(async (req, res) => {

        res.setHeader("Access-control-Allow-Origin", "*");
        // const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        // const pathName = reqUrl.pathname;

        const segments = req.url.split('/').filter(Boolen);
        if (req.method === "GET" && req.url === "/comedians") {

            try {
                const data = JSON.parse(await fs.readFile(COMEDIANS, 'utf-8'))
                res.writeHead(200, {
                    //"Content-Type": "text/plain; charset=utf-8",
                    "Content-Type": "text/json; charset=utf-8",
                });

                if (segments.length === 2) {
                    const comedian = data.find(c => c.id === segments[1])

                    if (!comedian) {
                        throw new Error('Stand up комик не найден')
                    }
                    res.end(JSON.stringify(comedian))
                }
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



