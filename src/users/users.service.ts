import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private Users: User[] = [];

  insertUser(
    userName: string,
    userGender: string,
    userPhone: string,
    userEmail: string,
    userAddress: string,
    userNationality: string,
    userDob: string,
    userEducation: string,
    userModeOfContact: string,
  ) {
    const UserId = new Date().toString() + Math.random().toString();
    const newUser = new User(
      UserId,
      userName,
      userGender,
      userPhone,
      userEmail,
      userAddress,
      userNationality,
      userDob,
      userEducation,
      userModeOfContact,
    );
    this.Users.push(newUser);
    return UserId;
  }

  getUsers() {
    return [...this.Users];
  }

  getSingleUser(UserId: string) {
    const User = this.Users.find((user) => user.id === UserId);
    if (!User) {
      throw new NotFoundException('User Doesnot exist!');
    }
    return { ...User };
  }
}
