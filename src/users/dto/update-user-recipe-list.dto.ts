import { PartialType } from '@nestjs/swagger';
import { CreateUserRecipeListDto } from './create-user-recipe-list.dto';

export class UpdateUserRecipeListDto extends PartialType(
  CreateUserRecipeListDto,
) {}
