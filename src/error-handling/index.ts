import { Application } from "express";
import { Request, Response, NextFunction } from 'express';

import fs from "fs"; 
import path from "path";


// INTERFACES PARA ERROS DO PRISMA
interface PrismaError extends Error {
    code?: string; // O Prisma pode retornar um código de erro
  }


// DEFINICAO DO DIRETORIO E ARQUIVO DE LOGS 
const logsDir = path.join(__dirname, "../../logs");
const logFilePath = path.join(logsDir, "errors.log");

// GARANTE QUE O DIRETORIO DE LOGS EXISTA
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

//Exportação da função que adiciona os middlewares de erro
export default (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        
        // Not found message
        res.status(404).json({message: "This route does not exist"});
    });

    //Middleware para capturar erros gerais (500)
    app.use((err: PrismaError , req: Request, res: Response, next: NextFunction) => {
        
        // Log do erro no console
        console.error("ERROR", req.method, req.path, err);
        


        //SALVAR ERRO EM UM ARQUIVO DE LOG
    const errorMessage = `${new Date().toISOString()} - ${req.method} ${req.path} - ${err.message}/n`;
    const logsDir = path.join(__dirname, "../../");
    if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true }); // Cria o diretório se não existir
}


    // TRATAMENTO DE ERRO DE VALIDACAO (EXEMPLO: DADOS INVÁLIDOS NO REQUEST)
    if(err.name === "ValidationError") {
        res.status(400).json({message: err.message});
    }


    // TRATAMENTO DE ERRO DO PRISMA (BANCO DE DADOS)
    if (err.code === "P2025") {
        res.status(404).json({ message: "Record not found" });
      }


    // TRATAMENTO DE ERRO PARA CANDIDATURAS DUPLICADAS 
    if (err.code === "P2002") {
        res.status(404).json({ message: "This entry already exists" });
      }


        // only render if the error ocurred before sending the response
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal server error. Check the server console", 

            });
        }
        //Continua a execução do middleware
        next(err);
        
    });
};