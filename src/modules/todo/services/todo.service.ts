import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../repositories/todo.repository.js'
import { CreateTodoDto } from '../dtos/create-todo.dto.js'
import { Todo } from '../entities/todo.entity.js'
import { UpdateTodoDto } from '../dtos/update-todo.dto.js'
import { UpdateCompletedValueTodoDto } from '../dtos/update-completed-value-todo.dto.js'

@Injectable()
export class TodoService {
  constructor (private readonly todoRepository: TodoRepository) {}

  async createTodo (createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto)

    return this.todoRepository.save(todo)
  }

  async getTodo (todoUuid: string): Promise<Todo> {
    return await this.todoRepository.findOneOrFail({ where: { uuid: todoUuid } })
  }

  async getTodos (): Promise<Todo[]> {
    return await this.todoRepository.find()
  }

  async updateTodo (todoUuid: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoRepository.save({
      ...updateTodoDto,
      uuid: todoUuid
    })
  }

  async updateTodoCompleted (
    todoUuid: string, 
    updateCompletedValueTodoDto: UpdateCompletedValueTodoDto
  ): Promise<Todo> {
    return await this.todoRepository.save({
      uuid: todoUuid,
      ...updateCompletedValueTodoDto
    })
  }

  async deleteTodo (
    todoUuid: string
  ): Promise<void> {
    await this.todoRepository.delete({
      uuid: todoUuid
    })
  }
}
