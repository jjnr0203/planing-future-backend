import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async create( createUserDto: CreateUserDto ) {
    try {
      const { password, ...getData} = createUserDto

      const user = this.userRepository.create({
        ...getData, password: bcrypt.hashSync(password, 10)
      });
      //consultar si le que traiga la contraseña
      await this.userRepository.save(user)

      return user;
    } catch (error) {
      
    }
    
  };

  async login (loginUserDto: LoginUserDto){
    
    const { email, password } = loginUserDto;
    
    const user = await this.userRepository.findOne({
      where: {email},
      select: { email: true, password: true}
    });

    if(!user) throw new UnauthorizedException('Usuario o contraseña incorrecta');

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Usuario o contraseña incorrecta');

    return user;
  }
}
