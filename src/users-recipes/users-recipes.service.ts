import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersRecipeDto } from './dto/create-users-recipe.dto';
import { UpdateUsersRecipeDto } from './dto/update-users-recipe.dto';
import { UsersRecipe } from './entities/users-recipe.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class UsersRecipesService {
  constructor(
    @InjectRepository(UsersRecipe)
    private readonly usersRecipeRepository: Repository<UsersRecipe>,
  ) {}

  async create(
    createUsersRecipeDto: CreateUsersRecipeDto,
    user: User,
    recipe: Recipe,
  ) {
    const item = new UsersRecipe();

    item.id = uuidv4();
    item.user_id = user.id;
    item.recipe_id = recipe.id;

    try {
      Object.assign(item, createUsersRecipeDto);

      return await this.usersRecipeRepository.save(item);
    } catch (error) {
      Logger.debug(error);
    }
  }

  findAll() {
    return `This action returns all usersRecipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersRecipe`;
  }

  update(id: number, updateUsersRecipeDto: UpdateUsersRecipeDto) {
    return `This action updates a #${id} usersRecipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersRecipe`;
  }
}
