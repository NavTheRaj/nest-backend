import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  converter = require('json-2-csv');
  fs = require('fs');
  private Users: User[] = [];
  private UsersFromCsv: User[] = [];

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
    this.saveUserToCsv();
    return UserId;
  }

  saveUserToCsv() {
    this.converter.json2csv(this.Users, (err: any, csv: any) => {
      if (err) {
        throw err;
      }
      console.log(csv);

      this.fs.writeFileSync('users.csv', csv);
    });
  }

  readFromCsv() {
    this.fs.readFile('users.csv', (err: any, data: any) => {
      if (err) {
        throw err;
      }

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

          this.UsersFromCsv.push(newUser);
        }
      });
    });
  }

  getUsers() {
    this.readFromCsv();
    return [...this.UsersFromCsv];
  }

  getSingleUser(UserId: string) {
    const User = this.Users.find((user) => user.id === UserId);
    if (!User) {
      throw new NotFoundException('User Doesnot exist!');
    }
    return { ...User };
  }
}
