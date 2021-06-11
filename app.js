import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
// const myParser = require("body-parser");
import bodyParser from "body-parser";
import { urlRouter } from './routes/url_router.js'; //ESM
import { loginRouter } from "./routes/login_router.js";
const app = express();
// dotenv.config();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/urlShortner", urlRouter);
app.use("/", loginRouter);
console.log("Port is " + process.env.PORT);
app.listen(process.env.PORT, () => {
console.log("Node server started running...");
});
