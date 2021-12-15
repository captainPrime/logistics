import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

/**
 * Base row type for all models
 */
export class Model {
  /**
   * ID of the row
   */
  @PrimaryColumn()
  id: string;
  /**
   * date the row was created
   */
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  /**
   * timestamp of last update
   */
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
  /**
   * timestamp when row was soft deleted, if it has been
   * soft deleted in the first place
   */
  @Column({ nullable: true })
  deleted_at?: Date;

  /**
   * sets updated at field just for every update
   */
  @BeforeUpdate()
  set_updated_at() {
    this.updated_at = new Date();
  }

  /**
   * sets id on creating row
   */
  @BeforeInsert()
  set_id() {
    this.id = v4();
  }
}
