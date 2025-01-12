import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsOptional()
    @IsString()
    lastName?: string;
}