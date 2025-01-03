import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AuthDto } from "./dtos";
import { hash } from "argon2";


@Injectable()
export class AuthService {

    constructor(private db: DatabaseService) { }

    async login(authDto: AuthDto) {

    }
    async signup(authDto: AuthDto) {
        try {
            const hashedPassword = await hash(authDto.email);
            const user = await this.db.user.create({
                data: {
                    email: authDto.email,
                    hash: hashedPassword,
                    firstName: authDto.firstName,
                    lastName: authDto.lastName,
                }
            });
            delete user.hash;
            return user;
        } catch (error) {
            throw error;
        }
    }
}