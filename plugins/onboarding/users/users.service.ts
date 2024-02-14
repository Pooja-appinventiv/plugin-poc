import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(user.name)
    private userModel: mongoose.Model<user>,
  ) {}
  async findall(): Promise<user[]> {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(user_details: CreateUserDto): Promise<user> {
    const createdUser = new this.userModel(user_details);
    return createdUser.save();
  }
  async findUserByUsername(username: string): Promise<user | undefined> {
    return this.userModel.findOne({ username }); // Use findOne to query for a user by username
  }
}
interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}
