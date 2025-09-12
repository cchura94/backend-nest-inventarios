import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreatePermissionDto {

    @ApiProperty()
    @IsOptional()
    action?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    subject?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    label?: string;
}
