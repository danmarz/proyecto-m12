import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { RecipeCategories } from '../enums/recipe-categories.enum';

@Entity('recipes')
export class Recipe {
  @ObjectIdColumn() _id: ObjectID;
  @Column({ unique: true }) id: string;
  @Column() title: string;
  @Column('enum', {
    enum: RecipeCategories,
  })
  category: RecipeCategories;
  @Column() recipe_image_url: string;
  @Column({ default: [] }) ingredients: string[];
  @Column() instructions: string;
  @Column() preparation_time: number;
  @Column() cook_time: number;
  @Column() total_time: number;
}
