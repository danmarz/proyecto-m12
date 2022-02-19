import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RecipeCategories } from '../enums/recipe-categories.enum';

export class FetchRecipeDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({
    enum: RecipeCategories,
  })
  @Expose()
  category: RecipeCategories;

  @ApiProperty()
  @Expose()
  ingredients: string[];

  @ApiProperty()
  @Expose()
  recipe_image_url?: string;

  @ApiProperty()
  @Expose()
  instructions?: string;

  @ApiProperty()
  @Expose()
  preparation_time?: number;

  @ApiProperty()
  @Expose()
  cook_time?: number;

  @ApiProperty()
  @Expose()
  total_time?: number;
}
