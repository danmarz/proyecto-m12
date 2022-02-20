import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserRecipeListDto } from './dto/update-user-recipe-list.dto';
import {
  UserRecipeList,
  UserRecipeListDocument,
} from './schemas/user-recipe-list.schema';

@Injectable()
export class UserRecipeListRepository {
  constructor(
    @InjectModel(UserRecipeList.name)
    private userRecipeListModel: Model<UserRecipeListDocument>,
  ) {}

  async create(userRecipeListItem: UserRecipeList): Promise<UserRecipeList> {
    const newListItem = new this.userRecipeListModel(userRecipeListItem);
    return await newListItem.save();
  }

  async findAll(): Promise<UserRecipeList[]> {
    return await this.userRecipeListModel
      .find()
      .populate('user')
      .populate('recipe')
      .exec();
  }

  async findAllRecipesByUser(userId: string): Promise<UserRecipeList[]> {
    return await this.userRecipeListModel
      .find({ user: userId })
      .populate('user')
      .populate('recipe')
      .exec();
  }

  async findOne(id: string): Promise<UserRecipeList> {
    return await this.userRecipeListModel.findById(id);
  }

  async update(
    id: string,
    update: UpdateUserRecipeListDto,
  ): Promise<UserRecipeList> {
    return await this.userRecipeListModel.findByIdAndUpdate(id, update, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.userRecipeListModel.findByIdAndRemove(id);
  }
}
