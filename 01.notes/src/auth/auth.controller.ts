import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos";
import { LoginDto } from "./dtos/login.dto";
import { AuthResponse } from "./models";


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