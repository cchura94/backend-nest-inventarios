import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AssignPermissionDto{
    @ApiProperty()
    @IsArray()
    permissionIds: number[];
}