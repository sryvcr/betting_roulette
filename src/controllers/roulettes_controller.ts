import { HTTPCodesEnum } from "../services/errors/enums/http_errors";
import { ApiResponse } from "../models/api/responses/api_response";
import { ListResponse } from "../models/api/responses/list_response";
import rouletesSvc from "../use_cases/roulettes/index";
import Logger from "../services/logger/pino";

const logger = Logger(__filename);

export class RoulettesController {

    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const items: any[] = await rouletesSvc.getList();
            const count: number = await rouletesSvc.countList();
            res.status(HTTPCodesEnum.SUCCESSFUL);
            res.json(new ApiResponse(
                HTTPCodesEnum.SUCCESSFUL,
                new ListResponse(items, count)
            ));
        } catch (error) {
            next(error)
        }
    }
}
