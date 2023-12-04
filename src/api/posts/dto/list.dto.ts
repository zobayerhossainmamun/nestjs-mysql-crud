import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ListDto {
    @Type(() => Number)
    @IsOptional()
    limit!: string;

    @Type(() => Number)
    @IsOptional()
    page?: string;
}