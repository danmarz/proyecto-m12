import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { RecipeCategories } from '../enums/recipe-categories.enum';

@Entity('recipes')
export class Recipe {
  @ObjectIdColumn() _id: ObjectID;

  @ApiProperty()
  @Column({ unique: true })
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({
    enum: RecipeCategories,
  })
  @Column('enum', {
    enum: RecipeCategories,
  })
  category: RecipeCategories;

  @ApiProperty()
  @Column()
  recipe_image_url: string;

  @ApiProperty()
  @Column({ default: [] })
  ingredients: string[];

  @ApiProperty()
  @Column()
  instructions: string;

  @ApiProperty()
  @Column()
  preparation_time: number;

  @ApiProperty()
  @Column()
  cook_time: number;

  @ApiProperty()
  @Column()
  total_time: number;
}
