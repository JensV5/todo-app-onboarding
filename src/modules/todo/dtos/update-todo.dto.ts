import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class UpdateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsDateString({ strict: true })
  deadline: Date
}
