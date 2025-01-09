import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  async create( createUserDto: CreateUserDto ) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user)
      return user;
    } catch (error) {
      console.log(error)
      
    }
    return 'This action adds a new auth';
  }
}
