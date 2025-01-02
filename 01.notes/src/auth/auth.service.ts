import { Injectable } from "@nestjs/common";

interface IAuthService {
    login(): string;
    signup(): string;
}

@Injectable()
export class AuthService implements IAuthService {
    login(): string {
        return 'This is login';
    }
    signup(): string {
        return 'this is signup';
    }

}