import { Body, Controller, Get, NotFoundException, Param, Patch, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGaurd } from "src/auth/guards";
import { GetUser } from "./decorator";
import { User } from "@prisma/client";
import { UserDto } from "./models";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGaurd)
    @Get()
    async getUser(@GetUser() user: User) {
        return user;
    }

    @UseGuards(JwtAuthGaurd)
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(id, userDto);
    }
}

