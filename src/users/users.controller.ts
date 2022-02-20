import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FetchUserDto } from './dto/fetch-user.dto';
import { MongooseClassSerializerInterceptor } from '../interceptors/mongooseClassSerializer.interceptor';
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
import { User } from './schemas/user.schema';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserRecipeListService } from './user-recipe-list.service';

@ApiTags('users')
@Controller('users')
// @MongooseClassSerializerInterceptor(FetchUserDto)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly userRecipeListService: UserRecipeListService,
  ) {}

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
   * Get all the recipes that a user created
   * @memberof UsersController
   */
  @ApiOkResponse({
    isArray: true,
    description: 'Returns all recipes belonging to the current user',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/recipes')
  async findAllUserRecipes(
    @CurrentUser() currentUser: User,
    @Param('userId') userId: string,
  ) {
    return await this.userRecipeListService.findRecipesForUser(
      currentUser,
      userId,
    );
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
  @Get(':userId')
  async findOne(@Param('userId') id: string) {
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
  @Patch(':userId')
  async update(
    @CurrentUser() currentUser: User,
    @Param('userId') id: string,
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
  @Delete(':userId')
  async remove(@CurrentUser() currentUser: User, @Param('userId') id: string) {
    return await this.usersService.remove(currentUser, id);
  }
}
