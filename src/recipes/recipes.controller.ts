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
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FetchRecipeDto } from './dto/fetch-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { AuthGuard } from '@nestjs/passport';
import { UserRecipeListService } from '../users/user-recipe-list.service';
import { CreateUserRecipeListDto } from '../users/dto/create-user-recipe-list.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/schemas/user.schema';
import { UserRecipeList } from '../users/schemas/user-recipe-list.schema';
import { UpdateUserRecipeListDto } from '../users/dto/update-user-recipe-list.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  private readonly logger = new Logger(RecipesController.name);

  constructor(
    private readonly recipesService: RecipesService,
    private readonly userRecipeListService: UserRecipeListService,
  ) {}

  /**
   * Register a new recipe
   * @param {CreateRecipeDto} createRecipeDto
   * @return {FetchRecipeDto}
   * @memberof RecipesController
   */
  @ApiCreatedResponse({
    type: FetchRecipeDto,
    isArray: false,
    description: 'Recipe created successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipesService.create(createRecipeDto);
  }

  /**
   * Get all recipes
   * @return {[Recipe]}
   * @memberof RecipesController
   */
  @ApiOkResponse({
    type: Recipe,
    isArray: true,
    description: 'Returns all existing recipes or an empty array',
  })
  @Get()
  async findAll(): Promise<Recipe[]> {
    return await this.recipesService.findAll();
  }

  /**
   * Get a single recipe by Id
   * @param {string} id
   * @return {Recipe}
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiOkResponse({
    type: Recipe,
    isArray: true,
    description: 'Returns a single recipe',
  })
  @Get(':recipeId')
  async findOne(@Param('recipeId') id: string) {
    return await this.recipesService.findOne(id);
  }

  /**
   * Get notes and rating of a recipe
   * @param {string} id
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({
    description: 'RecipeId was not found in the database',
  })
  @ApiOkResponse({
    isArray: false,
    description: 'Get a recipe note/rating',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':recipeId/notes')
  getNote(@CurrentUser() user: User, @Param('recipeId') recipeId: string) {
    return this.userRecipeListService.getNote(recipeId, user);
  }

  /**
   * Add notes and rating to a recipe
   * @param {string} id
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({
    description: 'RecipeId was not found in the database',
  })
  @ApiCreatedResponse({
    isArray: true,
    description: 'Adds a recipe note/rating',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post(':recipeId/notes')
  addNote(
    @Body() createUserRecipeListDto: CreateUserRecipeListDto,
    @CurrentUser() user: User,
    @Param('recipeId') recipeId: string,
  ) {
    return this.userRecipeListService.create(
      recipeId,
      user,
      createUserRecipeListDto,
    );
  }

  /**
   * Modify recipe note and/or rating
   * @param {string} recipeId
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({
    description: 'RecipeId was not found in the database',
  })
  @ApiOkResponse({
    type: UserRecipeList,
    isArray: true,
    description: 'Modifies a recipe note/rating',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':recipeId/notes')
  modifyNote(
    @Body() updateUserRecipeListDto: UpdateUserRecipeListDto,
    @CurrentUser() user: User,
    @Param('recipeId') recipeId: string,
  ) {
    return this.userRecipeListService.update(
      recipeId,
      user,
      updateUserRecipeListDto,
    );
  }

  /**
   * Deletes recipe note
   * @param {string} recipeId
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({
    description: 'RecipeId was not found in the database',
  })
  @ApiResponse({
    status: 204,
    description: 'No content: Successfully deleted item.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete(':recipeId/notes')
  deleteNote(@CurrentUser() user: User, @Param('recipeId') recipeId: string) {
    return this.userRecipeListService.remove(recipeId, user);
  }

  /**
   * Updates information of a single recipe by Id
   * @param {string} id
   * @param {UpdateRecipeDto} updateRecipeDto
   * @return {Recipe}
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiOkResponse({
    type: Recipe,
    isArray: false,
    description: 'Updates and returns a single recipe',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':recipeId')
  async update(
    @Param('recipeId') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipesService.update(id, updateRecipeDto);
  }

  /**
   * Deletes a single recipe by Id
   * @param {string} id
   * @memberof RecipesController
   */
  @ApiNotFoundResponse({ description: 'Recipe was not found in the database' })
  @ApiResponse({
    status: 204,
    description: 'No Content: succesfully deleted a Recipe',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @Delete(':recipeId')
  async remove(@Param('recipeId') id: string) {
    return await this.recipesService.remove(id);
  }
}
