import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: UserDTO) {
    const generatedId = this.UsersService.insertUser(
      body.name,
      body.gender,
      body.phone,
      body.email,
      body.address,
      body.nationality,
      body.dob,
      body.education,
      body.modeOfContact,
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
