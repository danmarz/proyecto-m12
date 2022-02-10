import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ enum: RecipeCategories })
  @IsNotEmpty()
  @IsEnum(RecipeCategories)
  readonly category: RecipeCategories;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  readonly recipe_image_url: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  readonly ingredients: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly instructions: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly preparation_time: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly cook_time: number;
}
