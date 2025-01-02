import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";



@Injectable()
export class AuthService {

    constructor(private db: DatabaseService) { }

    login() {
        return 'This is login';
    }
    signup() {
        return 'this is signup';
    }
}