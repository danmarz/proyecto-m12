import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
} from 'class-validator';
import { RecipeCategories } from '../enums/recipe-categories.enum';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsEnum(RecipeCategories)
  readonly category: string;

  @IsOptional()
  @IsUrl()
  readonly recipe_image_url: string;

  @IsOptional()
  @IsArray()
  readonly ingredients: string[];

  @IsOptional()
  @IsString()
  readonly instructions: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly preparation_time: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly cook_time: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly total_time: number;
}
