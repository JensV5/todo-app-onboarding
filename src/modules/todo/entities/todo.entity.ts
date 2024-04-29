import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { User } from "../../users/entities/user.entity.js"

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn({ precision: 3 })
  createdAt: Date

  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date

  @DeleteDateColumn({ precision: 3 })
  deletedAt: Date

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar', nullable: true })
  description: string | null

  @Column({ type: 'timestamp', precision: 3, nullable: true })
  deadline: Date | null

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @Column({ type: 'uuid' })
  @Index()
  userUuid: string

  @ManyToOne(() => User, user => user.todos)
  @JoinColumn({ name: 'userUuid' })
  user?: Relation<User>
}
