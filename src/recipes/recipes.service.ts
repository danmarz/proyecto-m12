import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import { v4 as uuidv4 } from 'uuid';
import { RecipeRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(private recipeRepository: RecipeRepository) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const newRecipe: Recipe = new Recipe(createRecipeDto);
    newRecipe._id = uuidv4();
    newRecipe.preparation_time = newRecipe.preparation_time ?? 0;
    newRecipe.cook_time = newRecipe.cook_time ?? 0;
    newRecipe.total_time = newRecipe.preparation_time + newRecipe.cook_time;

    return await this.recipeRepository.create(newRecipe);
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll();
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne(id);
    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const existingRecipe = await this.recipeRepository.findOne(id);

    if (!existingRecipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    const updatedRecipe = new Recipe({
      ...existingRecipe,
      ...updateRecipeDto,
    });

    updateRecipeDto.total_time =
      updatedRecipe.preparation_time + updatedRecipe.cook_time;

    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async remove(id: string) {
    await this.recipeRepository.remove(id);
  }
}
