import { Application } from "express"; 
import express from "express"; 
import logger from "morgan"; 
import cookieParser from "cookie-parser";
import cors from "cors"; 


//Configuracao da URL do Frontend

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000"


//Configuracao de Middleware

export default (app: Application) => {
    // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
    // Services like heroku use something called a proxy and you need to add this to your server
    app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
    app.use(
        cors({
            origin: [FRONTEND_URL],
        })
    );

  // In development environment the app logs
    app.use(logger("dev"));

    app.use(express.json());

    app.use(express.urlencoded({extended: false }));
 
    app.use(cookieParser());
    


}



