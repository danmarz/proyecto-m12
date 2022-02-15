import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUsersRecipeDto {
  /**
   * Reference to User who created the recipe
   * @example 'user UUID'
   * @type {string}
   * @memberof CreateUsersRecipeDto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  /**
   * Recipe to Recipe which the user created
   * @example 'recipe UUID'
   * @type {string}
   * @memberof CreateUsersRecipeDto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly recipe_id: string;

  /**
   * Recipe rating: 1-5, default is 0 (no rating)
   * @example '5'
   * @type {number}
   * @memberof CreateUsersRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @Min(1)
  @Max(5)
  @IsNumber()
  readonly rating?: number;

  /**
   * Recipe notes
   * @example 'Espectacular!'
   * @type {string}
   * @memberof CreateUsersRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  readonly notes?: string;
}
