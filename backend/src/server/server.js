import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const server = express();

//habilita o cors para todas as origens só use isso em desenvolvimento
// server.use(cors());

server.use(cors({
  origin: "http://127.0.0.1:5500"
}))

server.use(express.json());

server.use(router);

export default server;