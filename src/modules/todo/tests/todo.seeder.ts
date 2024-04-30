import { Injectable } from '@nestjs/common'
import { type CreateTodoDto } from '../dtos/create-todo.dto.js'
import { TodoRepository } from '../repositories/todo.repository.js'
import { Todo } from '../entities/todo.entity.js'

@Injectable()
export class TodoSeeder {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  generateCreateTodoDto (userUuid: string): CreateTodoDto {
    return {
      userUuid,
      title: 'Test todo',
      description: 'Test description',
      deadline: new Date()
    }
  }

  async createOneTodo (userUuid: string): Promise<Todo> {
    return await this.todoRepository.save(this.generateCreateTodoDto(userUuid))
  }
}