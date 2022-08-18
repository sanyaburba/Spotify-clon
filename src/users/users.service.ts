import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  async setRole(dto: SetRoleDto) {
    const user = await this.usersRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'User or role does not finded',
      HttpStatus.NOT_FOUND,
    );
  }
}
