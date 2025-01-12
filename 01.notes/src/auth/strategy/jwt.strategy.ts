import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, } from "passport-jwt";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(config: ConfigService, private db: DatabaseService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreElements: true,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const userId = payload.sub;
        const email = payload.email;
        const user = await this.db.user.findUnique({ where: { id: userId, email: email } });
        if (!user) {
            throw new UnauthorizedException();
        }
        delete user.hash;
        return user;
    }
};