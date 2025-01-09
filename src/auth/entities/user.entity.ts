import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')   
        id: string;

    @CreateDateColumn({
        select: false,
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
      createdAt: Date;
    
      @DeleteDateColumn({
        select: false,
        name: 'deleted_at',
        type: 'timestamp',
      })
      deletedAt: Date;
    
    @Column({
        name: 'email',
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
    })
    password: string;

    @Column({
        name: 'fullName',
        type: 'varchar'
    })
    fullName: string

}
