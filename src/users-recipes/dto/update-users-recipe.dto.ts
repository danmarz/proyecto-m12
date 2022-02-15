import { PartialType } from '@nestjs/swagger';
import { CreateUsersRecipeDto } from './create-users-recipe.dto';

export class UpdateUsersRecipeDto extends PartialType(CreateUsersRecipeDto) {}
