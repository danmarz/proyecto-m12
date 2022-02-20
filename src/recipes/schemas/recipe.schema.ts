import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { RecipeCategories } from '../enums/recipe-categories.enum';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  constructor(partial?: Partial<Recipe>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Prop()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    enum: RecipeCategories,
  })
  @Prop()
  category: RecipeCategories;

  @ApiProperty()
  @Prop([String])
  ingredients: string[];

  @ApiProperty()
  @Prop()
  recipe_image_url: string;

  @ApiProperty()
  @Prop()
  instructions: string;

  @ApiProperty()
  @Prop()
  preparation_time: number;

  @ApiProperty()
  @Prop()
  cook_time: number;

  @ApiProperty()
  @Prop()
  total_time: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
