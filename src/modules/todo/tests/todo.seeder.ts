import { Injectable } from '@nestjs/common'
import { type CreateTodoDto } from '../dtos/create-todo.dto.js'

@Injectable()
export class TodoSeeder {
  generateCreateTodoDto (): CreateTodoDto {
    return {
      title: 'Test todo',
      description: 'Test description',
      deadline: new Date()
    }
  }
}