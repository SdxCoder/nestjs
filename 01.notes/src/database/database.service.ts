import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        // TODO: Load from .en
        let databaseUrl: string = '';
        super({
            datasources: {
                db: {
                    url: databaseUrl,
                }
            }
        })
    }
}