import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: Request): Promise<{
        access_token: string;
        user: User;
    }>;
    validateCode(code: string): Promise<{
        valid: boolean;
    }>;
    refreshTokens(userId: number): Promise<import("@nestjs/common").ForbiddenException | {
        access_token: string;
        user: User;
    }>;
}
