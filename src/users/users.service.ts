import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  converter = require('json-2-csv');
  fsread = require('fs').promises;
  fswrite = require('fs');
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
    try {
      const UserId = nanoid();
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
      this.saveUserToCsv();
      return UserId;
    } catch (err) {
      throw new Error();
    }
  }

  saveUserToCsv() {
    this.converter.json2csv(this.Users, (err: any, csv: any) => {
      if (err) {
        throw err;
      }
      console.log(csv);

      this.fswrite.writeFileSync('users.csv', csv);
    });
  }

  async readFromCsv() {
    const allUsers = [];

    try {
      const data = await this.fsread.readFile('users.csv');

      const allData = data.toString().split('\n');

      allData.map((val: any, index: number) => {
        if (index !== 0) {
          const singleData = val.split(',');

          const newUser = new User(
            singleData[0],
            singleData[1],
            singleData[2],
            singleData[3],
            singleData[4],
            singleData[5],
            singleData[6],
            singleData[7],
            singleData[8],
            singleData[9],
          );

          allUsers.push(newUser);
        }
      });
      return allUsers;
    } catch (err) {
      throw new Error();
    }
  }

  async getUsers() {
    return [...(await this.readFromCsv())];
  }

  async getSingleUser(UserId: string) {
    const users = await this.readFromCsv();
    const User = users.find((user) => user.id === UserId);
    if (!User) {
      throw new NotFoundException('User Doesnot exist!');
    }
    return { ...User };
  }
}
