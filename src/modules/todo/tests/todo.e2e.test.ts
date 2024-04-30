import { expect } from 'expect'
import request from 'supertest'
import { before, describe, it, after } from 'node:test'
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { HttpAdapterHost } from '@nestjs/core'
import { HttpExceptionFilter } from '../../../utils/Exceptions/http-exception.filter.js'
import { AppModule } from '../../../app.module.js'
import { UserSeeder } from '../../users/tests/user.seeder.js'
import { UserSeederModule } from '../../users/tests/user-seeder.module.js'
import { TodoSeederModule } from './todo.seeder.module.js'
import { TodoSeeder } from './todo.seeder.js'
import { Role } from '../../roles/entities/role.entity.js'
import { SetupUserType } from '../../users/tests/setup-user.type.js'
import { RoleSeeder } from '../../roles/tests/role.seeder.js'
import { RoleSeederModule } from '../../roles/tests/role-seeder.module.js'
import { Todo } from '../entities/todo.entity.js'

describe('Todo tests', async () => {
  let app: INestApplication
  let roleSeeder: RoleSeeder
  let userSeeder: UserSeeder
  let todoSeeder: TodoSeeder

  let readonlyRole: Role
  let adminRole: Role

  let readonlyUser: SetupUserType
  let adminUser: SetupUserType

  let todo: Todo

  before(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        RoleSeederModule,
        UserSeederModule,
        TodoSeederModule
      ]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    )

    const httpAdapterHost = app.get(HttpAdapterHost)

    app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost))

    roleSeeder = moduleRef.get(RoleSeeder)
    userSeeder = moduleRef.get(UserSeeder)
    todoSeeder = moduleRef.get(TodoSeeder)

    readonlyRole = await roleSeeder.createReadonlyRole()
    adminRole = await roleSeeder.createAdminRole()

    readonlyUser = await userSeeder.setupUser({
      roleUuid: readonlyRole.uuid,
      email: roleSeeder.createRandomEmail()
    })
    adminUser = await userSeeder.setupUser({
      roleUuid: adminRole.uuid,
      email: roleSeeder.createRandomEmail()
    })

    todo = await todoSeeder.createOneTodo(adminUser.user.uuid)

    await app.init()
  })

  describe('Create todo', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')

      expect(response.status).toBe(401)
    })

    it('should return 401 when not authorized', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .set('Authorization', `Bearer ${readonlyUser.token}`)
        .send({})

      expect(response.status).toBe(400)
    })

    it('should return 400 when body is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .set('Authorization', `Bearer ${adminUser.token}`)
        .send({})

      expect(response.status).toBe(400)
    })

    it('should return 201', async () => {
      const dto = todoSeeder.generateCreateTodoDto(adminUser.user.uuid)

      const response = await request(app.getHttpServer())
        .post('/todos')
        .set('Authorization', `Bearer ${adminUser.token}`)
        .send(dto)

      expect(response.status).toBe(201)
    })
  })

  describe('Get todo', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(app.getHttpServer())
        .get(`/todos/${todo.uuid}`)

      expect(response.status).toBe(401)
    })

    it('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .get(`/todos/${todo.uuid}`)
        .set('Authorization', `Bearer ${adminUser.token}`)

      expect(response.status).toBe(200)
    })
  })

  after(async () => {
    await app.close()
  })
})
