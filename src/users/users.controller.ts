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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  /**
   * Register a new user
   * @return {User}
   * @memberof UsersController
   */
  @ApiCreatedResponse({
    type: User,
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Get all users
   * @return {[User]}
   * @memberof UsersController
   */
  @ApiOkResponse({
    type: User,
    isArray: true,
    description: 'Returns all existing users or an empty array',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  /**
   * Get a single user by Id
   * @param {string} id
   * @return {User}
   * @memberof UsersController
   */
  @ApiNotFoundResponse({ description: 'User was not found in the database' })
  @ApiOkResponse({
    type: User,
    isArray: false,
    description: 'Returns a single user',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  /**
   * Updates information of a single user by Id
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @return {User}
   * @memberof UsersController
   */
  @ApiNotFoundResponse({ description: 'User was not found in the database' })
  @ApiOkResponse({
    type: User,
    isArray: false,
    description: 'Updates and returns a single User',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @CurrentUser() currentUser: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(currentUser, id, updateUserDto);
  }

  /**
   * Deletes a single user by Id
   * @param {string} id
   * @memberof UsersController
   */
  @ApiNotFoundResponse({ description: 'User was not found in the database' })
  @ApiResponse({
    status: 204,
    description: 'No Content: succesfully deleted a User',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete(':id')
  async remove(@CurrentUser() currentUser: User, @Param('id') id: string) {
    return await this.usersService.remove(currentUser, id);
  }
}
