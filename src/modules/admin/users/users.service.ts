import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){

  }

  async create(createUserDto: CreateUserDto) {
    console.log("GUARDANDO EN SERVICIO... ", createUserDto);

    const existeName = await this.userRepository.findOne({where: {name: createUserDto.name}})

    if(existeName){
      throw new BadRequestException(`El name ${createUserDto.name}, ya está en uso`)
    }

    const existeEmail = await this.userRepository.findOne({where: {email: createUserDto.email}})

    if(existeEmail){
      throw new BadRequestException(`El email ${createUserDto.email}, ya está en uso`)
    }

    // const nuevoUser = this.userRepository.create(createUserDto);

    // encriptar
    const hashPassword = await bcrypt.hash(createUserDto.password, 12);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashPassword
    });

    this.userRepository.save(newUser);

    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new NotFoundException('El usuario no existe');

    return user;
  }

  async findOneByEmail(email: string){
    const user = await this.userRepository.findOneBy({email: email})
    if(!user) throw new NotFoundException(`El usuario con email: ${email} no existe`);
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
