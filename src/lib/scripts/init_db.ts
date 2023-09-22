import { Database } from "bun:sqlite";
import spanish from './spanish.json'

// init DB
const db = new Database("mydb.sqlite");

// drop table if exists
const drop = db.query("drop table if exists spanish");
drop.run();
console.log("dropped table 'spanish'")

// init spanish table
const create = db.query("create table if not exists spanish (id INT, spanish TEXT, english TEXT)")
create.run();
console.log("created table 'spanish'");

// read csv and insert into table
const insert = db.query("insert into spanish (id, spanish, english) values ($id, $spanish, $english)");
const insertWords = db.transaction(words => {
    for (const word of words) insert.run(word);
  });
insertWords(spanish);

// read from table to verify contents
const query = db.query("select count(*) from spanish")
const countSpanishWords = query.values();
console.log(`Inserted ${countSpanishWords} spanish words`);