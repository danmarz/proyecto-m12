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

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = new Recipe();

    recipe.id = uuidv4();
    recipe.total_time =
      createRecipeDto.preparation_time + createRecipeDto.cook_time ?? -1;

    try {
      Object.assign(recipe, createRecipeDto);

      return await this.recipeRepository.save(recipe);
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
    const recipe = await this.recipeRepository.findOne(id);

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne(id);

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    try {
      return await this.recipeRepository.save({
        ...recipe,
        ...updateRecipeDto,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`recipe «${recipe.title}» already exists`);
      }
    }
  }

  async remove(id: string) {
    const recipe = await this.recipeRepository.findOne(id);

    if (!recipe) {
      throw new NotFoundException(`recipe id «${id}» does not exist`);
    }

    await this.recipeRepository.remove(recipe);
  }
}
