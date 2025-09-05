import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({nullable: true, required: false})
    @IsOptional()
    @IsString()
    descripcion: string;
}