import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AuthDto } from "./dtos";
import { hash, verify } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpExceptionResponse } from "src/core/exception_filters/models";
import { LoginDto } from "./dtos/login.dto";


@Injectable()
export class AuthService {

    constructor(private db: DatabaseService) { }

    async login(dto: LoginDto) {
        try {
            // Find user by email
            const user = await this.db.user.findUnique({
                where: { email: dto.email }
            });
            // If user not found throw exception
            if (!user) {
                const error: HttpExceptionResponse = { statusCode: HttpStatus.NOT_FOUND, error: 'No user found for this email.' }
                throw new HttpException(error, HttpStatus.NOT_FOUND);
            }
            // If user found compare password hash
            const match = await verify(user.hash, dto.password);
            // If hash doesn't matches throw exception
            if (!match) {
                const error: HttpExceptionResponse = { statusCode: HttpStatus.FORBIDDEN, error: 'Invalid Credentials.' }
                throw new HttpException(error, HttpStatus.FORBIDDEN);
            }
            // else return user
            delete user.hash;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signup(authDto: AuthDto) {
        try {
            const hashedPassword = await hash(authDto.password);
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
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const error: HttpExceptionResponse = {
                        error: 'Credentials Taken.', statusCode: HttpStatus.FORBIDDEN,
                    };
                    throw new HttpException(error, HttpStatus.FORBIDDEN);
                }
            }
            throw error;
        }
    }
}