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

  async findOne(id: string) {
    return this._prisma.factura.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async update(payload: { id: string; data: UpdateFacturaDto }) {
    const { id, data } = payload;

    // Eliminamos los items existentes de la factura
    await this._prisma.item.deleteMany({
      where: { facturaId: id },
    });

    // Actualizamos la factura
    await this._prisma.factura.update({
      where: { id },
      data: {
        numero: data.numero,
        cliente: data.cliente,
        total: data.total,
      },
    });

    // Insertamos los nuevos items
    if (data.items?.length) {
      console.log('Creando ítems:', data.items.length);
      for (const item of data.items) {
        await this._prisma.item.create({
          data: {
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            precio: item.precio,
            facturaId: id,
          },
        });
      }
    }

    // Retornamos la factura actualizada con los nuevos items
    return this._prisma.factura.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async remove(id: string) {
    await this._prisma.item.deleteMany({ where: { facturaId: id } });
    return this._prisma.factura.delete({ where: { id } });
  }
}
