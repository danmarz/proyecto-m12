import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `email «${createUserDto.email}» already exists`,
        );
      }
    }
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
