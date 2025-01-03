import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        const databaseUrl: string = process.env.DATABASE_URL;
        super({
            datasources: {
                db: {
                    url: databaseUrl,
                }
            }
        })
    }
}