import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneById(userId: string): Promise<User> {
    return await this.userModel.findOne({ id: userId });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async update(user: User): Promise<User> {
    return await this.userModel.findOneAndUpdate({ id: user.id }, user, {
      new: true,
    });
  }

  async remove(userId: string) {
    await this.userModel.findOneAndRemove({ id: userId });
  }
}
