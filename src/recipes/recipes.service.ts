import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersRecipesService } from '../users-recipes/users-recipes.service';
import { User } from '../users/entities/user.entity';
import { CreateUsersRecipeDto } from '../users-recipes/dto/create-users-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly userRecipesService: UsersRecipesService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto, user: User) {
    const recipe = new Recipe();

    recipe.id = uuidv4();
    recipe.total_time =
      createRecipeDto.preparation_time + createRecipeDto.cook_time ?? -1;

    try {
      Object.assign(recipe, createRecipeDto);

      const savedRecipe = await this.recipeRepository.save(recipe);

      if (savedRecipe) {
        this.userRecipesService.create(
          {} as CreateUsersRecipeDto,
          user,
          savedRecipe,
        );

        return savedRecipe;
      }
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new ConflictException(
          `recipe named «${createRecipeDto.title}» already exists`,
        );
      }
    }
  }

  async findAll() {
    return await this.recipeRepository.find();
  }

  async findOne(id: string) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    const updatedRecipe = new Recipe({
      ...recipe,
      ...updateRecipeDto,
    });

    updatedRecipe.total_time =
      updatedRecipe.preparation_time + updatedRecipe.cook_time ?? -1;

    try {
      return await this.recipeRepository.save(updatedRecipe);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`recipe «${recipe.title}» already exists`);
      }
    }
  }

  async remove(id: string) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    await this.recipeRepository.remove(recipe);
  }
}
