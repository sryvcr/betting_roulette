import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "../errors/handler/error_handler";
import { routes } from "../../routes/index";
import Logger from "../logger/pino";

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const logger = Logger(__filename);

export class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.initErrorHandler();
    }

    config() {
        this.app.set("port", HTTP_PORT);
        this.app.use(morgan("common"));
        this.app.use(json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(routes);
    }

    initErrorHandler() {
        this.app.use(errorHandler);
    }

    async start() {
        try {
            this.app.listen(this.app.get("port"), () => {
                logger.info(`🆗 express application running on port ${this.app.get("port")}`);
            });
        } catch (error) {
            logger.error(`server error: ${JSON.stringify(error)}`);
        }
    }
}
