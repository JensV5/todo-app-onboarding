import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity.js'
import { TodoController } from './controllers/todo.controller.js'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [],
  exports: []
})
export class TodoModule {}