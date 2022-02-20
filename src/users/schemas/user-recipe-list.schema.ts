import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Recipe } from '../../recipes/schemas/recipe.schema';
import { User } from './user.schema';

export type UserRecipeListDocument = UserRecipeList & Document;

@Schema()
export class UserRecipeList {
  constructor(partial?: Partial<UserRecipeList>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Prop()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, ref: 'User' })
  user: User;

  @ApiProperty()
  @Prop({ type: String, ref: 'Recipe' })
  recipe: Recipe;

  @ApiProperty()
  @Prop()
  rating: number;

  @ApiProperty()
  @Prop()
  notes: string;
}

export const UserRecipeListSchema =
  SchemaFactory.createForClass(UserRecipeList);
