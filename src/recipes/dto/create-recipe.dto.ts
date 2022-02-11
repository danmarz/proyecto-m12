import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  /**
   * Recipe name/title
   * @example 'Salmón a la mostaza'
   * @type {string}
   * @memberof CreateRecipeDto
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  /**
   * Recipe category. Must be either 'entrantes','primeros', 'segundos'or 'postres',
   * @example 'segundos'
   * @type {RecipeCategories}
   * @memberof CreateRecipeDto
   */
  @ApiProperty({ enum: RecipeCategories })
  @IsNotEmpty()
  @IsEnum(RecipeCategories)
  readonly category: RecipeCategories;

  /**
   * Recipe ingredients array
   * @example ['4 filetes de salmón (aproximadamente 125 gr cada uno)', '65 gr de mantequilla derretida', '3 cucharadas de mostaza tipo Dijon', '1 ½ cucharadas de miel', '¼ de taza (30 gr) de pan rallado', '¼ de taza (30 gr) de nuez picada', 'Un puñado de perejil fresco, picado', 'Sal y pimienta al gusto', '1 lechuga']
   * @type {string[]}
   * @memberof CreateRecipeDto
   */
  @ApiProperty({ default: [] })
  @IsOptional()
  @IsArray()
  readonly ingredients: string[];

  /**
   * Recipe photo location/URL
   * @example 'https://i1.wp.com/irecetasfaciles.com/wp-content/uploads/2018/06/Salmon-a-la-mostaza-en-el-horno.jpg?fit=800%2C530&ssl=1'
   * @type {string}
   * @memberof CreateRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsUrl()
  readonly recipe_image_url?: string;

  /**
   * Recipe instructions
   * @example "Precalentar el horno a 200°C (moderado/fuerte). \nMezclar la mantequilla, la mostaza y la miel en un bol chico. En otro bol, mezclar el pan rallado con las nueces y el perejil picado. Reservar.\nUntar cada filete de salmón con la mezcla de mostaza y espolvorear la parte superior de cada filete con la mezcla de pan rallado.\nPoner el salmón a cocinar en el horno precalentado unos 12 a 15 minutos o hasta que se desarme fácilmente con un tenedor. Para servir, sazonar cada filete con sal y pimienta y adornar con unas hojas de lechuga y una cuchara de la salsa.\n"
   * @type {string}
   * @memberof CreateRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  readonly instructions?: string;

  /**
   * Recipe preparation time in min
   * @example 12
   * @type {number}
   * @memberof CreateRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly preparation_time?: number;

  /**
   * Recipe cooking time in min
   * @example 15
   * @type {number}
   * @memberof CreateRecipeDto
   */
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(2880)
  readonly cook_time?: number;
}
