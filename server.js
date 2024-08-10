import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from 'morgan'
import logger from "./utils/logger.js";

import {
  APP_PORT,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  DEV_API,
  MODE,
  PROD_API,
} from "./config/index.js";
import {
  dallERoutes,
  authRoutes,
  postsRoutes,
  userRoutes,
  mailRoutes,
  collectionsRoutes,
  savedPostsRoutes,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import redis from "./config/redis.js";
const app = express();

const PORT = APP_PORT || 3000;
global.appRoot = path.resolve(__dirname);

app.use(cookieParser());

const corsOptions = {
  origin: `${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,PATCH",
  // exposedHeaders: ["set-cookie"],
};
app.use(morgan("dev", { stream: logger.stream }));
// app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.disable("x-powered-by");
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dalle", dallERoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/collections", collectionsRoutes);
app.use("/api/v1/savedposts", savedPostsRoutes);

// app.get("/", async (req, res) => {
//   res.send("Hello from Server");
// });

// console.log(await redis.llen("blacklist"));

// Error handler

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client", "build", "index.html"));
});
app.use(errorHandler);

connectDB(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${MODE === "dev" ? DEV_API : PROD_API}`
      );
    })
  )
  .catch((err) => console.log(err));
