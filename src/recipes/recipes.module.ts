import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { UsersRecipesModule } from '../users-recipes/users-recipes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), UsersRecipesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
