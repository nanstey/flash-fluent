import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite");

const server = Bun.serve({
    port: 8080,
    fetch(req) {
        const url = new URL(req.url)
        console.log(url.pathname, url.search);
        if(url.pathname === "/api") {
            const { limit, offset } = searchParamsToJSON(url.search);
            if (limit && offset) {
                const query = db.query("select * from spanish order by id limit $limit offset $offset");
                const result = query.all(limit, offset);
    
                return new Response(JSON.stringify(result));
            }
        }
        return new Response("404!")
    }
})

console.log(`Listening on ${server.hostname}: ${server.port}...`)

function searchParamsToJSON(searchString) {
    const searchParams = new URLSearchParams(searchString);
    let obj = {};
    for (let [key, value] of searchParams) {
        obj[key] = value;
    }
    return obj;
}