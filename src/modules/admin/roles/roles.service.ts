import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
){

  }
  async create(createRoleDto: CreateRoleDto) {
    const { name, description, permissionIds } = createRoleDto;

    const permissions = permissionIds?.length
    ? await this.permissionRepository.find({
      where: { id: In(permissionIds)}
    })
    :[];

    const role = this.roleRepository.create({
      name, description, permissions
    })
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({where: {id}});
    if(!role){
      throw new NotFoundException(`Role con Id ${id} not found`)
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    const { name, description, permissionIds } = updateRoleDto;

    if(name) role.name = name;
    if(description !== undefined) role.description = description;

    if(permissionIds){
      role.permissions =  await this.permissionRepository.find({
        where: { id: In(permissionIds)}
      });
    }
    return this.roleRepository.save(role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async addPermissionToRole(roleId: number, permissionIds: number[]){
    const role = await this.findOne(roleId);
    
    const newPermissions = await this.permissionRepository.find({
      where: {id: In(permissionIds)},
    });
    const existingPermissionIds = role.permissions.map((p) => p.id);

    const merged = [
      ...role.permissions,
      ...newPermissions.filter((p) => !existingPermissionIds.includes(p.id)),
    ];
    role.permissions = merged;

    return this.roleRepository.save(role);
  }

  async removePermissionFromRole(roleId: number, permissionIds: number[]){
    const role = await this.findOne(roleId);
    role.permissions = role.permissions.filter(
      (p) => !permissionIds.includes(p.id),
    );
    return this.roleRepository.save(role);
  }

  async getPermissionOfRole(roleId: number){
    const role = await this.findOne(roleId);
    return role.permissions;
  }
}
