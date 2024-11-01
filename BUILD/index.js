"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
function startServer() {
    const APP = (0, express_1.default)();
    const PORT = process.env.PORT || 3000;
    APP.use((0, cors_1.default)());
    // Indicar a Express que confíe en el proxy
    APP.set('trust proxy', true);
    // Middleware para servir recursos estáticos (CSS, JS, etc.)
    APP.use(express_1.default.static(path_1.default.join(__dirname, '../js/'))); // Carpeta para archivos JavaScript
    APP.use(express_1.default.static(path_1.default.join(__dirname, '../sass/'))); // Carpeta para archivos CSS
    APP.use(express_1.default.static(path_1.default.join(__dirname, '../owlcarousel/')));
    APP.use(express_1.default.static(path_1.default.join(__dirname, '../images/')));
    APP.get("/", (req, res) => {
        // Obtener la IP del cliente
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
        console.log(`Conexión desde la IP: ${clientIp}`);
        res.sendFile(path_1.default.join(__dirname, "../home.html"));
    });
    APP.listen(PORT, () => {
        console.info("Started Server in PORT: ", PORT);
    });
}
startServer();
//# sourceMappingURL=index.js.map