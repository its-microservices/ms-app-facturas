import { IsString, IsInt, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateItemDto } from './create-item.dto';

export class CreateFacturaDto {
    @IsInt()
    numero: number;

    @IsString()
    cliente: string;

    @IsNumber()
    total: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateItemDto)
    items: CreateItemDto[];
}
