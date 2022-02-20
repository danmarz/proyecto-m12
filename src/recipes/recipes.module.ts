import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeRepository } from './recipes.repository';
import {
  UserRecipeList,
  UserRecipeListSchema,
} from '../users/schemas/user-recipe-list.schema';
import { UserRecipeListService } from '../users/user-recipe-list.service';
import { UserRecipeListRepository } from '../users/user-recipe-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: UserRecipeList.name, schema: UserRecipeListSchema },
    ]),
  ],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    RecipeRepository,
    UserRecipeListService,
    UserRecipeListRepository,
  ],
})
export class RecipesModule {}
