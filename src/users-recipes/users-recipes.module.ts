import { Module } from '@nestjs/common';
import { UsersRecipesService } from './users-recipes.service';
import { UsersRecipesController } from './users-recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRecipe } from './entities/users-recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRecipe])],
  controllers: [UsersRecipesController],
  providers: [UsersRecipesService],
  exports: [UsersRecipesService],
})
export class UsersRecipesModule {}
