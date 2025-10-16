import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('almacen')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  create(@Body() createAlmacenDto: CreateAlmacenDto) {
    return this.almacenService.create(createAlmacenDto);
  }

  @Get()
  findAll() {
    return this.almacenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.almacenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlmacenDto: UpdateAlmacenDto) {
    return this.almacenService.update(+id, updateAlmacenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.almacenService.remove(+id);
  }
}
