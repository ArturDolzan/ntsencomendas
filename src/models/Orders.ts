/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum Status {
  Opened = 1,
  Closed = 2,
  Canceled = 3
}

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public created_at: Date

  @Column()
  public description: string

  @Column('int')
  public status: Status
}

export default Order
