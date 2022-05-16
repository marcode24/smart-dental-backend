import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { FindOptions, Op } from 'sequelize';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { User } from '../entities/user.entity';

import { Role } from 'src/auth/enums/roles.enum';

import { AuthService } from 'src/auth/services/auth.service';
import { ISearchParams } from 'src/common/models/search.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  private generateCode(): string {
    const head = Date.now().toString(36).substring(3);
    const tail = Math.random().toString(36).substring(9);
    return head + tail;
  }

  async create(data: CreateUserDto) {
    const { role } = data;
    if(role === Role.ADMIN) {
      data.code = this.generateCode();
    }
    const newModel = new this.userModel(data);
    console.log(newModel);
    const { username } = newModel;
    if(await this.validateUserUnique(username)) {
      return new BadRequestException('username already in use');
    }
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const modelSaved = await newModel.save();
    const { password, ...response } = modelSaved.toJSON();
    return this.authService.generateJWT(modelSaved);
  }

  async validateCode(code: string) {
    const userFound = await this.userModel.findOne(
      {
        where: { code },
        attributes: ['code', 'role']
      }
    );
    if(!userFound) {
      return false;
    }
    return userFound.get({ plain: true }).role === Role.ADMIN
  }

  async validateUserUnique(username: string) {
    const usersFound = await this.userModel.findOne({ where: { username }});
    return usersFound ? true : false ;
  }

  async findAll(optionsParams: ISearchParams) {
    const { fullname, limit, offset, all } = optionsParams;
    let options: FindOptions = {};
    if(all) {
      options = {
        attributes: [ 'id_user', 'name', 'last_name', 'image' ],
        where: {
          status: true,
        }
      }
    } else {
      const newLimit = Number(limit) || 5;
      const newOffset = Number(offset) || 0;
      options = {
        attributes: { exclude: ['password'] },
        limit: newLimit,
        offset: newOffset,
      };
      console.log({options});
      if(fullname) {
        const search = `%${fullname.toString()}%`
        const { attributes } = options;
        options = {
          attributes,
          where: {
            [Op.or]: {
              name: { [Op.like]: search },
              last_name: { [Op.like]: search },
            },
          },
        };
      }
    }
    console.log(options);
    const [ users, totalAdmin, totalUser ] = await Promise.all([
      this.userModel.findAll(options),
      this.userModel.count({ where: { role: Role.ADMIN } }),
      this.userModel.count({ where: { role: Role.DENTIST } }),
    ]);
    const data = { users, totalAdmin, totalUser };
    return data;
  }

  async findById(userId: number) {
    const userFound = await this.userModel.findByPk(
      userId,
      {
        attributes: { exclude: ['password'] }
      }
    );
    return { user: userFound };
  }

  async setStatusUser(userId: number, value:boolean) {
    const setValue = Boolean(value);
    const userDB = await this.userModel.findByPk(
      userId,
      {
        attributes: ['id_user', 'status']
      }
    )
    userDB.status = setValue;
    return await userDB.save();
  }

  async update(userId: number, changes: UpdateUserDto) {
    const { password, ...rest } = changes;
    return await this.userModel.update(rest, { where: { id_user: userId }});
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ where: { username } });
    if(!user) {
      return new NotFoundException('user not found');
    }
    return user.get({ plain:true });
  }

}
