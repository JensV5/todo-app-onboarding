import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTodoDto } from '../dtos/create-todo.dto.js'
import { TodoTransformerType } from '../transformers/todo.transformer.js'
import { UserTransformerType } from '../../users/transformers/user.transformer.js'
import { KnownError } from '../../../utils/Exceptions/errors.js'
import { UpdateTodoDto } from '../dtos/update-todo.dto.js'
import { UpdateCompletedValueTodoDto } from '../dtos/update-completed-value-todo.dto.js'

@ApiTags('Todo')
@Controller('todos')
export class TodoController {
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: TodoTransformerType
  })
  async createTodo (
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<void> {
    throw new KnownError('not_found')
  }

  @Get(':todo')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully received.',
    type: UserTransformerType
  })
  async getTodo (
    @Param('todo', ParseUUIDPipe) todoUuid: string
  ): Promise<void> {
    throw new KnownError('not_found')
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The todos have been successfully received.',
    type: TodoTransformerType
  })
  async getTodos(): Promise<void> {
    throw new KnownError('not_found')
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
  ): Promise<void> {
    throw new KnownError('not_found')
  }

  @Delete('/:todo')
  @ApiResponse({
    status: 204,
    description: 'The todo has been successfully deleted.'
  })
  async deleteTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string
  ): Promise<void> {
    throw new KnownError('not_found')
  }

  @Post('/:todo/complete')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully completed.'
  })
  async completeTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string,
    @Body() updateCompletedValueTodoDto: UpdateCompletedValueTodoDto,
  ): Promise<void> {
    throw new KnownError('not_found')
  }

  @Post('/:todo/uncomplete')
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully uncompleted.'
  })
  async uncompleteTodo(
    @Param('todo', ParseUUIDPipe) todoUuid: string,
    @Body() updateCompletedValueTodoDto: UpdateCompletedValueTodoDto,
  ): Promise<void> {
    throw new KnownError('not_found')
  }
}
