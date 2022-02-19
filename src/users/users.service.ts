import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException(['Email already exists']);
    }

    const user = new User();
    user.id = uuidv4();
    Object.assign(user, createUserDto);
    user.password = await this.authService.hashPassword(createUserDto.password);

    await this.userRepository.create(user);
    return new User({
      ...user,
      token: this.authService.getTokenForUser(user),
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    return user;
  }

  async update(currentUser: User, id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    if (user.id !== currentUser.id) {
      throw new UnauthorizedException(
        `not authorized to update user id «${id}»`,
      );
    }

    Object.assign(user, updateUserDto);

    user.password = updateUserDto.password
      ? await this.authService.hashPassword(updateUserDto.password)
      : user.password;

    try {
      return await this.userRepository.update(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`email «${user.email}» already exists`);
      }
    }
  }

  async remove(currentUser: User, id: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`user id «${id}» does not exist`);
    }

    if (user.id !== currentUser.id) {
      throw new UnauthorizedException(
        `not authorized to delete user id «${id}»`,
      );
    }

    await this.userRepository.remove(id);
  }
}
