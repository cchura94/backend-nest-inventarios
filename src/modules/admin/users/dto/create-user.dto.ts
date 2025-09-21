import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({nullable:false, required: true})
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(200)
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({
        description: 'Ids de roles asignados al usuario',
        type: [Number],
        example: [2, 6, 7]
    })
    @IsOptional()
    @IsArray({message: 'Los Ids de los roles debes ser un array'})
    roleIds?: number[]

}
