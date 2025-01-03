import { IsAlpha, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    readonly email: string;
    @IsString()
    readonly password: string;
    @IsString()
    @IsAlpha()
    readonly firstName: string;
    readonly lastName?: string;
}