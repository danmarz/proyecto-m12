import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { RecipeCategories } from '../enums/recipe-categories.enum';

@Entity('recipes')
export class Recipe {
  constructor(partial?: Partial<Recipe>) {
    Object.assign(this, partial);
  }

  @ApiHideProperty()
  @ObjectIdColumn()
  _id: ObjectID;

  @ApiProperty()
  @Expose()
  @Column({ unique: true })
  id: string;

  @ApiProperty()
  @Expose()
  @Column()
  title: string;

  @ApiProperty({
    enum: RecipeCategories,
  })
  @Expose()
  @Column('enum', {
    enum: RecipeCategories,
  })
  category: RecipeCategories;

  @ApiProperty()
  @Expose()
  @Column({ default: [] })
  ingredients: string[];

  @ApiProperty()
  @Expose()
  @Column()
  recipe_image_url: string;

  @ApiProperty()
  @Expose()
  @Column()
  instructions: string;

  @ApiProperty()
  @Expose()
  @Column()
  preparation_time: number;

  @ApiProperty()
  @Expose()
  @Column()
  cook_time: number;

  @ApiProperty()
  @Expose()
  @Column()
  total_time: number;
}
