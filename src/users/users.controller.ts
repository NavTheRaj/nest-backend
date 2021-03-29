import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  addProduct(
    @Body('name') userName: string,
    @Body('gender') userGender: string,
    @Body('phone') userPhone: string,
    @Body('email') userEmail: string,
    @Body('gender') userAddress: string,
    @Body('nationality') userNationality: string,
    @Body('dob') userDob: string,
    @Body('education') userEducation: string,
    @Body('modeOfContact') userModeOfContact: string,
  ) {
    const generatedId = this.UsersService.insertUser(
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
    return { id: generatedId };
  }

  @Get()
  getAllUsers() {
    return this.UsersService.getUsers();
  }

  @Get(':id')
  getProduct(@Param('id') UserId: string) {
    return this.UsersService.getSingleUser(UserId);
  }
}
