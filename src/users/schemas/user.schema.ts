import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop()
  first_name: string;

  @ApiProperty()
  @Prop()
  last_name: string;

  @ApiProperty()
  @Prop({})
  password: string;

  @ApiProperty()
  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
