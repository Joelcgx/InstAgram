import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

export function startServer() {
    const APP = express();
    const PORT = process.env.PORT || 3000;

    APP.use(cors());

    // Indicar a Express que confíe en el proxy
    APP.set('trust proxy', true);

    // Middleware para servir recursos estáticos (CSS, JS, etc.)
    APP.use(express.static(path.join(__dirname, '../js/'))); // Carpeta para archivos JavaScript
    APP.use(express.static(path.join(__dirname, '../sass/'))); // Carpeta para archivos CSS
    APP.use(express.static(path.join(__dirname, '../owlcarousel/')));
    APP.use(express.static(path.join(__dirname, '../images/')));

    APP.get("/", (req: Request, res: Response) => {
        // Obtener la IP del cliente
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;

        console.log(`Conexión desde la IP: ${clientIp}`);

        res.sendFile(path.join(__dirname, "../home.html"));
    });

    APP.listen(PORT, () => {
        console.info("Started Server in PORT: ", PORT);
    });
}

startServer();