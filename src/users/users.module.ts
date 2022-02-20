import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import {
  UserRecipeList,
  UserRecipeListSchema,
} from './schemas/user-recipe-list.schema';
import { UserRecipeListService } from './user-recipe-list.service';
import { UserRecipeListRepository } from './user-recipe-list.repository';
import { RecipesModule } from '../recipes/recipes.module';
import { RecipeRepository } from '../recipes/recipes.repository';
import { Recipe, RecipeSchema } from '../recipes/schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRecipeList.name, schema: UserRecipeListSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
    AuthModule,
    RecipesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserRecipeListService,
    UserRecipeListRepository,
    RecipeRepository,
  ],
})
export class UsersModule {}
