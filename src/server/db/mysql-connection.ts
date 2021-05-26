import mysql from "mysql2/promise";
import log from "@ajar/marker";
import { env } from "../utils/index";

export let connection: mysql.Connection;

export const connect = async () => {
  if (connection) return connection;
  connection = await mysql.createConnection({
    host: env("DB_HOST"),
    port: Number(env("DB_PORT")),
    database: env("DB_NAME"),
    user: env("DB_USER_NAME"),
    password: env("DB_USER_PASSWORD"),
  });
  await connection.connect();
  log.magenta(" ✨  Connected to MySql DB ✨ ");
};

// export default connection;

//-------------------------------------------
// import mysql from "mysql2/promise";
// import log from "@ajar/marker";
// import {env} from "../utils/index"

// let connection = await mysql.createConnection({
//   host: env('DB_HOST'),
//   port: Number(env('DB_PORT')),
//   database: env('DB_NAME'),
//   user: env('DB_USER_NAME'),
//   password: env('DB_USER_PASSWORD'),
// });

// await connection.connect();

// log.magenta(" ✨  Connected to MySql DB ✨ ");

// export default connection;
