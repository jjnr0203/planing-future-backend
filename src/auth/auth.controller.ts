import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto)
  }

  @Get('users-token')
  @UseGuards( AuthGuard())
  async userToken(@Req() req:Request){
    const user = req['user']

    return {user}
  }

  @Get('user')
  @SetMetadata('profiles', ['user','admin'])
  @UseGuards( AuthGuard())
  profile(@Req() req:Request){
    const user = req['user'] 
    return {
      ok: true,
      user
    }
  }


}
