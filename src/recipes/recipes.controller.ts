import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ConflictException,
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
    try {
      return await this.repository.save({ ...createRecipeDto });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `recipe named «${createRecipeDto.title}» already exists`,
        );
      }
    }
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
    try {
      return await this.repository.save({
        ...recipe,
        ...updateRecipeDto,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `recipe named «${updateRecipeDto.title}» already exists`,
        );
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const recipe = await this.repository.findOne(id);
    await this.repository.remove(recipe);
  }
}
