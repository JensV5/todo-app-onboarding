import { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Todo } from '../entities/todo.entity.js'

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor (@InjectEntityManager() entityManager: EntityManager) {
    super(Todo, entityManager)
  }
}
