import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission> 
  ){}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission)
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({where: {id}});
    if(!permission){
      throw new NotFoundException(`Permiso con id: ${id} no existe`);
    } 
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permiso = await this.findOne(id);
    const updated = Object.assign(permiso, updatePermissionDto);
    return await this.permissionRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
