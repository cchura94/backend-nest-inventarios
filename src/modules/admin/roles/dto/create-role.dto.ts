import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateRoleDto {

    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty({nullable: true})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    permissionIds?:string[];

}
