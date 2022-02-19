import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeRepository } from './recipes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipeRepository],
})
export class RecipesModule {}
