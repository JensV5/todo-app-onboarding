import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity.js'
import { TodoController } from './controllers/todo.controller.js'
import { TodoRepository } from './repositories/todo.repository.js'
import { TodoService } from './services/todo.service.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoRepository, TodoService],
  exports: []
})
export class TodoModule {}