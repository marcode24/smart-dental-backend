import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    const { username } = newModel;
    if(await this.validateUserUnique(username)) {
      return new BadRequestException('username already in use');
    }
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const modelSaved = await newModel.save();
    const { password, ...response } = modelSaved.toJSON();
    return response;
  }

  async validateUserUnique(username: string) {
    const usersFound = await this.userModel.findOne({ where: { username } });
    return usersFound ? true : false ;
  }

  async findAll(fullname: string, limit: number = 5, offset: number = 0, ) {
    const newLimit = limit || 5;
    const newOffset = offset || 0;
    let options: FindOptions = {
      attributes: { exclude: ['password'] },
      limit: newLimit,
      offset: newOffset,
    };
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
    return await this.userModel.findAll(options);
  }

  async findById(userId: string) {
    const validUserId = Number(userId);
    if(!validUserId) {
      return new BadRequestException('must provide a valid id');
    }
    const userFound = await this.userModel.findByPk(
      validUserId,
      {
        attributes: { exclude: ['password'] }
      }
    );
    if(!userFound) {
      return new NotFoundException(`user not found with id: ${validUserId}`);
    }
    return userFound;
  }

  async setStatusUser(userId: string, value:boolean) {
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

}
