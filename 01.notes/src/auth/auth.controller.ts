import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(readonly authService: AuthService) { }

    @Post('login')
    login() {
        return this.authService.login();
    }

    @Post('signup')
    signup() {
        return this.authService.signup();
    }
}