import { Module } from '@nestjs/common'
import { TodoSeeder } from './todo.seeder.js'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from '../entities/todo.entity.js'
import { TodoRepository } from '../repositories/todo.repository.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  providers: [
    TodoSeeder,
    TodoRepository
  ],
  exports: [TodoSeeder]
})
export class TodoSeederModule {}