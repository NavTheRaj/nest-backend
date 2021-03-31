import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { CustomValidationPipe } from './Validation/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // @Post()
  // @UsePipes(new CustomValidationPipe())
  // async create(@Body() body: UserDTO) {
  //   // const generatedId = this.UsersService.insertUser(
  //   //   body.name,
  //   //   body.gender,
  //   //   body.phone,
  //   //   body.email,
  //   //   body.address,
  //   //   body.nationality,
  //   //   body.dob,
  //   //   body.education,
  //   //   body.modeOfContact,
  //   // );
  //   // return { id: generatedId };
  //   return body.name;
  // }

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
