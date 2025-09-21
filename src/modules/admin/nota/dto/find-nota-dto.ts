import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class FindNotaDto{
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    tipo_nota?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    estado_nota?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsDateString()
    fecha_inicio?: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsDateString()
    fecha_fin?: string;
    
    
}