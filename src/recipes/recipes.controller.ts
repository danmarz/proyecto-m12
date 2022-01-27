import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  private recipes: Recipe[] = [];

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    const recipe: Recipe = { ...createRecipeDto, id: this.recipes.length + 1 };
    this.recipes.push(recipe);
    return recipe;
    // return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipes;
    // return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const recipe = this.recipes.find((recipe) => recipe.id === parseInt(id));
    return recipe;
    // return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    const index = this.recipes.findIndex(
      (recipe) => recipe.id === parseInt(id),
    );

    this.recipes[index] = {
      ...this.recipes[index],
      ...updateRecipeDto,
    };

    return this.recipes[index];
    // return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id != parseInt(id));
    // return this.recipesService.remove(+id);
  }
}
