import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import logger from "winston";
import cors from "cors";
import cookieParser from "cookie-parser";

import { initializeSocketIo } from "./src/lib/socket.js";

const app = express();
const server = http.createServer(app);
const io = initializeSocketIo(server);

// 환경변수 설정
dotenv.config();

const port = process.env.PORT || 3001;

const allowedOrigins = (process.env.ORIGIN || "http://localhost:3000").split(
  ","
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routesPath = path.join(__dirname, "src", "routers");
const files = fs.readdirSync(routesPath);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome nang-man API Server!");
});

const startServer = async () => {
  // 모든 라우터 코드 동적 할당
  await Promise.all(
    files.map(async (file) => {
      if (file.endsWith(".js")) {
        const route = await import(path.join("file://", routesPath, file));
        const apiEndpoint = "/api/" + file.replace(".router.js", "");
        app.use(apiEndpoint, route.default);
      }
    })
  );

  server.listen(port, () => {
    logger.info(`서버가 http://localhost:${port}에 성공적으로 연결되었습니다.`);
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => logger.info("몽고디비 연결에 성공했습니다."))
      .catch((e) => console.error(e));
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });
};

startServer();
