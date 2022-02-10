import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @ObjectIdColumn()
  _id: ObjectID;

  @Expose()
  @ApiProperty()
  @Column()
  id: string;

  @Expose()
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Expose()
  @ApiProperty()
  @Column()
  first_name: string;

  @Expose()
  @ApiProperty()
  @Column()
  last_name: string;

  @ApiProperty()
  @Column()
  password: string;

  @Expose()
  @ApiProperty()
  token: string;
}
