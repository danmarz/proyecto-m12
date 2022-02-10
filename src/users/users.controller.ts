import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpCode,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@SerializeOptions({
  strategy: 'excludeAll',
})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @CurrentUser() currentUser: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(currentUser, id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  async remove(@CurrentUser() currentUser: User, @Param('id') id: string) {
    return await this.usersService.remove(currentUser, id);
  }
}
