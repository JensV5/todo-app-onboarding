import { ApiProperty } from "@nestjs/swagger"
import { Transformer } from "@appwise/transformer"
import { Todo } from "../entities/todo.entity.js"

export class TodoTransformerType {
  @ApiProperty()
  uuid: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  title: string

  @ApiProperty({ type: String, nullable: true })
  description: string | null
  
  @ApiProperty({ type: String, format: "date-time", nullable: true })
  deadline: string | null

  @ApiProperty()
  completed: boolean
}

export class TodoTransformer extends Transformer<Todo, TodoTransformerType> {
  transform (todo: Todo): TodoTransformerType {
    return {
      uuid: todo.uuid,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline?.toISOString() ?? null,
      completed: todo.completed
    }
  }
}
