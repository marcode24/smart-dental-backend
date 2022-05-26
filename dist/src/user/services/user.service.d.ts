import { BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { ISearchParams } from 'src/common/models/search.model';
export declare class UserService {
    private userModel;
    private authService;
    constructor(userModel: typeof User, authService: AuthService);
    private generateCode;
    create(data: CreateUserDto): Promise<BadRequestException | {
        access_token: string;
        user: User;
    }>;
    validateCode(code: string): Promise<boolean>;
    validateUserUnique(username: string): Promise<boolean>;
    findAll(optionsParams: ISearchParams): Promise<{
        users: User[];
        totalAdmin: number;
        totalUser: number;
    }>;
    findById(userId: number): Promise<{
        user: User;
    }>;
    setStatusUser(userId: number, value: boolean): Promise<User>;
    update(userId: number, changes: UpdateUserDto): Promise<{
        user: User;
    }>;
    findByUsername(username: string): Promise<any>;
    changeCode(idUser: number): Promise<{
        newCode: string;
    }>;
}
