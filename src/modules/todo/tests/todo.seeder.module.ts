import { Module } from '@nestjs/common'
import { TodoSeeder } from './todo.seeder.js'

@Module({
  providers: [TodoSeeder],
  exports: [TodoSeeder]
})
export class TodoSeederModule {}