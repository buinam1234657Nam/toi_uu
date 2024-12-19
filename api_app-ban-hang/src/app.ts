require("dotenv").config()
import express from "express"
import cors from "cors"
import routers from "./router"
import connectDB from "./config/connectDataBase"
import routerPayment from "./service/payment.service"
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", routers)
app.use("/api", routerPayment)
app.listen(process.env.PORT, () => {
    console.log("onchange port  3000")
})
connectDB()