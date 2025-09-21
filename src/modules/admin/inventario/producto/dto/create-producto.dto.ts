import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductoDto {

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({nullable: true, required: false})
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({nullable: true})
    @IsString()
    @MaxLength(100)
    @IsOptional()
    codigo_barra?: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    unidad_medida: string;

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    @IsOptional()
    marca?: string;

    @ApiProperty({type: "string", default: "0.00"})
    @IsDecimal()
    precio_venta_actual: number;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @IsOptional()
    imagen?: string;

    @ApiProperty({type: 'boolean'})
    @IsBoolean()
    estado: boolean;


    @ApiProperty()
    @IsInt()
    categoria: number;

}
