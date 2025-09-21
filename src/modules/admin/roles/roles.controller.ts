import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AssignPermissionDto } from './dto/assign-permissions.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Patch(':id/permissions')
  addPermission(
    @Param('id') id: number,
    @Body() dto: AssignPermissionDto
  ){
    return this.rolesService.addPermissionToRole(id, dto.permissionIds);
  }

  @Delete(':id/permissions')
  removePermission(
    @Param('id') id: number,
    @Body() dto: AssignPermissionDto
  ){
    return this.rolesService.removePermissionFromRole(id, dto.permissionIds);
  }

  @Get(':id/permissions')
  getPermissions(@Param('id') id: number){
    return this.rolesService.getPermissionOfRole(id);
  }
}
