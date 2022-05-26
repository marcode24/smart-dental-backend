import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    renewToken(userId: number): Promise<ForbiddenException | {
        access_token: string;
        user: User;
    }>;
    generateJWT(user: User): Promise<{
        access_token: string;
        user: User;
    }>;
}
