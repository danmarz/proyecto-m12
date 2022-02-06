import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();

    if (createUserDto.password !== createUserDto.retyped_password) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(['Email already exists']);
    }

    user.email = createUserDto.email;
    user.id = Math.floor(Math.random() * 1000) + '';
    user.password = await this.authService.hashPassword(createUserDto.password);

    return {
      ...(await this.usersRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    try {
      return await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`email «${user.email}» already exists`);
      }
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    await this.usersRepository.remove(user);
  }
}
