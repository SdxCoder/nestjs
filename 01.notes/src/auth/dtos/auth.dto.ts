import { IsAlpha, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class AuthDto extends LoginDto {
    @IsString()
    @IsAlpha()
    readonly firstName: string;
    readonly lastName?: string;
}