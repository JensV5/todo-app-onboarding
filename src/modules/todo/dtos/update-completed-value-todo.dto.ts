import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

export class UpdateCompletedValueTodoDto {
  @ApiProperty()
  @IsBoolean()
  completed: boolean
}
