import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRecipeListDto } from '../users/dto/create-user-recipe-list.dto';
import { UpdateUserRecipeListDto } from './dto/update-user-recipe-list.dto';
import { UserRecipeList } from '../users/schemas/user-recipe-list.schema';
import { v4 as uuidv4 } from 'uuid';
import { UserRecipeListRepository } from './user-recipe-list.repository';
import { User } from './schemas/user.schema';
import { RecipeRepository } from '../recipes/recipes.repository';

@Injectable()
export class UserRecipeListService {
  constructor(
    private userRecipeListRepository: UserRecipeListRepository,
    private recipeRepository: RecipeRepository,
  ) {}

  async create(
    recipeId: string,
    user: User,
    createUserRecipeListDto: CreateUserRecipeListDto,
  ) {
    const newListItem: UserRecipeList = new UserRecipeList(
      createUserRecipeListDto,
    );

    const recipe = await this.recipeRepository.findOne(recipeId);

    if (!recipe) {
      return new NotFoundException();
    }

    newListItem._id = uuidv4();
    newListItem.user = user;
    newListItem.recipe = recipe;

    return await this.userRecipeListRepository.create(newListItem);
  }

  async findAll() {
    return await this.userRecipeListRepository.findAll();
  }

  async findRecipesForUser(currentUser: User, userId: string) {
    if (currentUser._id == userId) {
      return await this.userRecipeListRepository.findAllRecipesByUser(userId);
    } else throw new UnauthorizedException();
  }

  async update(
    recipeId: string,
    user: User,
    updateRecipeDto: UpdateUserRecipeListDto,
  ) {
    const recipe = await this.recipeRepository.findOne(recipeId);

    if (!recipe) {
      return new NotFoundException();
    }

    let userRecipes = await this.userRecipeListRepository.findAllRecipesByUser(
      user._id,
    );

    userRecipes = userRecipes.filter((el) => el.recipe._id == recipeId);

    return await this.userRecipeListRepository.update(
      userRecipes[0]._id,
      updateRecipeDto,
    );
  }

  async remove(recipeId: string, user: User) {
    const recipe = await this.recipeRepository.findOne(recipeId);

    if (!recipe) {
      return new NotFoundException();
    }
    let userRecipes = await this.userRecipeListRepository.findAllRecipesByUser(
      user._id,
    );

    userRecipes = userRecipes.filter((el) => el.recipe._id == recipeId);

    return await this.userRecipeListRepository.remove(userRecipes[0]._id);
  }
}
