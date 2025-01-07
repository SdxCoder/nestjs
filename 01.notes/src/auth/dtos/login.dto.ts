import { IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    readonly email: string;
    @IsStrongPassword()
    readonly password: string;
}