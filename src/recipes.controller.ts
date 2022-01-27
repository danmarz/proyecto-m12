import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('/recipes')
export class RecipesController {
  private recipes: Recipe[] = [];

  @Get()
  findAll() {
    return this.recipes;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const recipe = this.recipes.find((recipe) => recipe.id === parseInt(id));
    return recipe;
  }

  @Post()
  create(@Body() input: CreateRecipeDto) {
    const recipe: Recipe = { ...input, id: this.recipes.length + 1 };
    this.recipes.push(recipe);
    return recipe;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateRecipeDto) {
    const index = this.recipes.findIndex(
      (recipe) => recipe.id === parseInt(id),
    );

    this.recipes[index] = {
      ...this.recipes[index],
      ...input,
    };

    return this.recipes[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {
    this.recipes = this.recipes.filter((recipe) => recipe.id != parseInt(id));
  }
}
