import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){

  }

  create(createUserDto: CreateUserDto) {
    console.log("GUARDANDO EN SERVICIO... ", createUserDto);

    const nuevoUser = this.userRepository.create(createUserDto);
    this.userRepository.save(nuevoUser);

    return nuevoUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new NotFoundException('El usuario no existe');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if(result.affected === 0) throw new NotFoundException('EL Usuario no existe');
  }
}
