import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacturaService {

  constructor(private _prisma: PrismaService) { }

  create(createFacturaDto: CreateFacturaDto) {
    return this._prisma.factura.create({
      data: {
        numero: createFacturaDto.numero,
        cliente: createFacturaDto.cliente,
        total: createFacturaDto.total,
        items: {
          create: createFacturaDto.items,
        },
      },
      include: { items: true },
    });
  }

  findAll() {
    return this._prisma.factura.findMany({
      include: {
        items: true, // incluir los ítems relacionados
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} factura`;
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
}
