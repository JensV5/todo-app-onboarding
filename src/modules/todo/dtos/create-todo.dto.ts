import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"
import { IsNullable } from "../../../utils/validators/is-nullable.validator.js"

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  userUuid: string

  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNullable()
  description: string | null

  @ApiProperty()
  @IsDateString({ strict: true })
  @IsNullable()
  deadline: Date | null
}
