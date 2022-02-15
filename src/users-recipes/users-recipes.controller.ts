import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { UsersRecipesService } from './users-recipes.service';
import { CreateUsersRecipeDto } from './dto/create-users-recipe.dto';
import { UpdateUsersRecipeDto } from './dto/update-users-recipe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users-recipes')
@Controller('users-recipes')
@SerializeOptions({
  strategy: 'excludeAll',
})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersRecipesController {
  private readonly logger = new Logger(UsersRecipesController.name);

  constructor(private readonly usersRecipesService: UsersRecipesService) {}

  // @Post()
  // create(@Body() createUsersRecipeDto: CreateUsersRecipeDto) {
  //   return this.usersRecipesService.create(createUsersRecipeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersRecipesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersRecipesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUsersRecipeDto: UpdateUsersRecipeDto,
  // ) {
  //   return this.usersRecipesService.update(+id, updateUsersRecipeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersRecipesService.remove(+id);
  // }
}
