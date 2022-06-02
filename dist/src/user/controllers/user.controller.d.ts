import { NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(all: string, fullname?: string, limit?: number, offset?: number): Promise<{
        users: import("../entities/user.entity").User[];
        totalAdmin: number;
        totalUser: number;
    }>;
    findById(userId: number): Promise<NotFoundException | {
        user: import("../entities/user.entity").User;
    }>;
    create(payload: CreateUserDto): Promise<import("@nestjs/common").BadRequestException | {
        access_token: string;
        user: import("../entities/user.entity").User;
    }>;
    changeStatus(userId: number, status: boolean): Promise<import("../entities/user.entity").User>;
    changeCode(userId: number): Promise<{
        newCode: string;
    }>;
    update(userId: number, payload: UpdateUserDto): Promise<{
        user: import("../entities/user.entity").User;
    }>;
}
