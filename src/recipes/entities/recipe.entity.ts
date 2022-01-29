import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @ObjectIdColumn() _id: ObjectID;
  @Column() uuid: string;
  @Column({ unique: true }) title: string;
  @Column() category: string;
  @Column() recipe_image_url: string;
  @Column({ default: [] }) ingredients: string[];
  @Column() instructions: string;
  @Column() preparation_time: number;
  @Column() cook_time: number;
  @Column() total_time: number;
}
