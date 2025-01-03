import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body(new ValidationPipe()) authDto: AuthDto) {
        return this.authService.login(authDto);
    }

    @Post('signup')
    signup(@Body(new ValidationPipe()) authDto: AuthDto) {
        return this.authService.signup(authDto);
    }
}