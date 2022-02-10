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
  @Column()
  id: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column()
  first_name: string;

  @Expose()
  @Column()
  last_name: string;

  @Column() password: string;

  @Expose()
  token: string;
}
