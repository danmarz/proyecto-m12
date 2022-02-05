import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() _id: ObjectID;
  @Column() id: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
}
