import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users-recipes')
export class UsersRecipe {
  constructor(partial?: Partial<UsersRecipe>) {
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
  user_id: string;

  @ApiProperty()
  @Expose()
  @Column()
  recipe_id: string;

  @ApiProperty()
  @Expose()
  @Column({ default: 0 })
  rating: number;

  @ApiProperty()
  @Expose()
  @Column()
  notes: string;
}
