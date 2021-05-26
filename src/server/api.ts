import express from "express";
import cors from "cors";
import morgan from "morgan";
import log from "@ajar/marker";
import { connect } from "./db/mysql-connection";
import book_router from "./modules/book/book.controller";
import { env } from "./utils/index";
import { error_handler, not_found } from "./middleware/errors-handler";

const PORT = Number(env("PORT"));
const HOST = env("HOST");

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));

// routing
// app.use('/api/stories', story_router);
app.use("/api/books", book_router);

// central error handling
app.use(error_handler);

//when no routes were matched...
app.use("*", not_found);

//start the express api server
(async () => {
  await connect();
  await app.listen(PORT, HOST);
  log.magenta(`api is live on`, ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);
})().catch(console.log);
