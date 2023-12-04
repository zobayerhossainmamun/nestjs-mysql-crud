import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDto {
    @Type(() => String)
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @MaxLength(100, { message: 'Title maximum length is 100' })
    title!: string;

    @Type(() => String)
    @IsNotEmpty({ message: 'Description cannot be empty' })
    description?: string;
}