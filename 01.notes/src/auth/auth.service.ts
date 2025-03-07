import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AuthDto } from "./dtos";
import { hash, verify } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpExceptionResponse } from "src/core/exception_filters/models";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthResponse } from "./models";


@Injectable()
export class AuthService {

    constructor(private db: DatabaseService, private jwtService: JwtService, private config: ConfigService) { }

    async login(dto: LoginDto): Promise<AuthResponse> {
        try {
            const user = await this.validateUser(dto.email, dto.password);
            if (!user) {
                const error: HttpExceptionResponse = { statusCode: HttpStatus.UNAUTHORIZED, error: 'Invalid email or password.' }
                throw new HttpException(error, HttpStatus.UNAUTHORIZED);
            }
            const accessToken = await this.signJwtToken(user.id, user.email);
            return {
                accessToken: accessToken,
            };
        } catch (error) {
            throw error;
        }
    }

    async signup(authDto: AuthDto): Promise<AuthResponse> {
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
            const accessToken = await this.signJwtToken(user.id, user.email);
            return {
                accessToken: accessToken,
            };
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

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.db.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return null;
        }
        const match = await verify(user.hash, password);
        if (!match) {
            return null;
        }
        return user;
    }


    private signJwtToken(userId: string, email: string): Promise<string> {
        const payload = { sub: userId, email: email };
        return this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: '24h',
        });
    }
}