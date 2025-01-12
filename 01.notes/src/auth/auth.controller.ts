import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos";
import { LoginDto } from "./dtos/login.dto";
import { AuthResponse } from "./models";
import { JwtAuthGaurd } from "./guards";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() dto: LoginDto): Promise<AuthResponse> {
        return this.authService.login(dto);
    }

    @Post('signup')
    signup(@Body() authDto: AuthDto): Promise<AuthResponse> {
        return this.authService.signup(authDto);
    }
}