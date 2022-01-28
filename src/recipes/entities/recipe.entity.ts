import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @ObjectIdColumn() _id: ObjectID;
  @Column() uid: number;
  @Column({ unique: true }) title: string;
  @Column() category: string;
  @Column() recipeImageUrl: string;
  @Column({ default: [] }) ingredients: string[];
  @Column() instructions: string;
  @Column() prepTime: number;
  @Column() cookTime: number;
  @Column() totalTime: number;
}
