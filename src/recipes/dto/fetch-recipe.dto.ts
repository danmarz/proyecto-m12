import { ApiProperty } from '@nestjs/swagger';
import { RecipeCategories } from '../enums/recipe-categories.enum';

export class FetchRecipeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({
    enum: RecipeCategories,
  })
  category: RecipeCategories;

  @ApiProperty()
  ingredients: string[];

  @ApiProperty()
  recipe_image_url?: string;

  @ApiProperty()
  instructions?: string;

  @ApiProperty()
  preparation_time?: number;

  @ApiProperty()
  cook_time?: number;

  @ApiProperty()
  total_time?: number;
}
