import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserRecipeListDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  readonly rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly notes: string;
}
