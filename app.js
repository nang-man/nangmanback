import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { initializeSocketIo, socketHandler } from "./src/lib/socket.js";

const app = express();
const server = http.createServer(app);
const io = initializeSocketIo(server);

// 환경변수 설정
dotenv.config();

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

const allowedOrigins = (process.env.ORIGIN || "http://localhost:5173").split(
   ","
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routesPath = path.join(__dirname, "src", "routers");
const files = fs.readdirSync(routesPath);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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

   mongoose
      .connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log("[🥦 DATABASE]: Connected to MongoDB successfully!");
      })
      .catch((err) => {
         console.error(`[❌ DATABASE]: ${err}`);
      })
      .finally(() => {
         server.listen(port, () => {
            console.log(`[✅ SERVER]: Server is listening in PORT ${port} == `);
         });
      });

   io.on("connection", (socket) => {
      socketHandler(io, socket);
   });
};

startServer();
