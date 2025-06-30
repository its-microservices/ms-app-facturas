import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateItemDto {
    @IsString()
    descripcion: string;

    @IsInt()
    cantidad: number;

    @IsNumber()
    precio: number;
}
