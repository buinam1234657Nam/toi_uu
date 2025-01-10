require("dotenv").config();
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDataBase";
import routers from "./router";
import routerPayment from "./service/payment.service";
import bodyParser from "body-parser";
const https = require("https");
const fs = require("fs");

// Đọc chứng chỉ SSL
const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
};

// Tạo app Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api", routers);
app.use("/api", routerPayment);

// Tạo server HTTPS
const PORT = process.env.PORT || 443; // Port mặc định HTTPS là 443
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running securely on HTTPS port ${PORT}`);
});

// Kết nối Database
connectDB();
