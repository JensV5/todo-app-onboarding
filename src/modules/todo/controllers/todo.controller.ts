import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTodoDto } from '../dtos/create-todo.dto.js'
import { TodoTransformerType } from '../transformers/todo.transformer.js'
import { UserTransformerType } from '../../users/transformers/user.transformer.js'
import { KnownError } from '../../../utils/Exceptions/errors.js'
import { UpdateTodoDto } from '../dtos/update-todo.dto.js'
import { UpdateCompletedValueTodoDto } from '../dtos/update-completed-value-todo.dto.js'
import { TodoService } from '../services/todo.service.js'
import { Todo } from '../entities/todo.entity.js'

@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: TodoTransformerType
  })
  async createTodo (
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.createTodo(createTodoDto)
  }

  @Get(':todo')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully received.',
    type: UserTransformerType
  })
  async getTodo (
    @Param('todo', ParseUUIDPipe) todoUuid: string
  ): Promise<Todo> {
    console.log('getting todo with')
    console.log(todoUuid)
    return await this.todoService.getTodo(todoUuid)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The todos have been successfully received.',
    type: TodoTransformerType
  })
  async getTodos(): Promise<Todo[]> {
    return await this.todoService.getTodos()
  }

  @Post('/:todo')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
    type: TodoTransformerType
  })
  async updateTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(todoUuid, updateTodoDto)
  }

  @Delete('/:todo')
  @ApiResponse({
    status: 204,
    description: 'The todo has been successfully deleted.'
  })
  async deleteTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string
  ): Promise<void> {
    return await this.todoService.deleteTodo(todoUuid)
  }

  @Post('/:todo/complete')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully completed.'
  })
  async completeTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string,
    @Body() updateCompletedValueTodoDto: UpdateCompletedValueTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodoCompleted(todoUuid, updateCompletedValueTodoDto)
  }

  @Post('/:todo/uncomplete')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully uncompleted.'
  })
  async uncompleteTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string,
    @Body() updateCompletedValueTodoDto: UpdateCompletedValueTodoDto,
  ): Promise<Todo> {
    return await this.todoService.updateTodoCompleted(todoUuid, updateCompletedValueTodoDto)
  }
}
