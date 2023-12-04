import { Transform, TransformFnParams } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        comment: 'Primary key id',
    })
    id!: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        comment: 'Post Title',
    })
    title!: string;

    @Column({
        type: 'longtext',
        nullable: true,
        comment: 'Post Description',
    })
    description!: string;

    @Column({ 
        default: false 
    })
    status: boolean;

    @Transform((row: TransformFnParams) => +new Date(row.value))
    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        comment: 'Creation time',
    })
    createdAt!: Date;
    
    @Transform((row: TransformFnParams) => +new Date(row.value))
    @UpdateDateColumn({
        type: 'timestamp',
        nullable: false,
        comment: 'Updated time',
    })
    updatedAt!: Date;
}