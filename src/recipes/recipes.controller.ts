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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('recipes')
export class RecipesController {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
    private readonly recipesService: RecipesService,
  ) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.repository.save({ ...createRecipeDto });
  }

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.repository.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const recipe = await this.repository.findOne(id);
    return await this.repository.save({
      ...recipe,
      ...updateRecipeDto,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const recipe = await this.repository.findOne(id);
    await this.repository.remove(recipe);
  }
}
