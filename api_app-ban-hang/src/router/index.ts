import express, { Router } from "express"
const routers: Router = express.Router()
import routerUsers from "./user.router";
import routerSingin from "./singin.router";
import routerForgotPassword from "./forgot";
import routerProduct from "./product.router";
import routerCart from "./cart";
import routerOrder from "./order";
const defaultRouters = [
    {
        path: "/user",
        router: routerUsers
    },
    {
        path: "/singin",
        router: routerSingin
    },
    {
        path: "/forgot-password",
        router: routerForgotPassword
    },
    {
        path: "/product",
        router: routerProduct
    },
    {
        path: "/cart",
        router: routerCart
    },
    {
        path: "/order",
        router: routerOrder
    },
]
defaultRouters.forEach((route) => {
    routers.use(route.path, route.router);
});
export default routers