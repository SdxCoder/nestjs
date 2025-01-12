import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { UserDto } from "./models";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpExceptionResponse } from "src/core/exception_filters/models";

@Injectable()
export class UserService {
    constructor(private db: DatabaseService) { }

    async updateUser(userId: string, userDto: UserDto): Promise<User> {
        try {
            const user = await this.db.user.update({
                where: { id: userId }, data: userDto,
            });
            if (!user) {
                throw new Error('Failed to update user. Rollback changes');
            }
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    const error: HttpExceptionResponse = {
                        error: 'User to update not found.', statusCode: HttpStatus.NOT_FOUND,
                    };
                    throw new HttpException(error, HttpStatus.NOT_FOUND);

                }
            }
            throw error;
        }
    }
}
