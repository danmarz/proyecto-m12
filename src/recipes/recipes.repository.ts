import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(recipe: Recipe): Promise<Recipe> {
    const newRecipe = new this.recipeModel(recipe);
    return await newRecipe.save();
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec();
  }

  async findOne(recipeId: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ id: recipeId });
  }

  async update(recipeId: string, update: UpdateRecipeDto): Promise<Recipe> {
    return await this.recipeModel.findOneAndUpdate({ id: recipeId }, update, {
      new: true,
    });
  }

  async remove(recipeId: string) {
    await this.recipeModel.findOneAndRemove({ id: recipeId });
  }
}
