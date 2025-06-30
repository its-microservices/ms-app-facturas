import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

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
      include: { items: true },
    });
  }

  async findOne(id: string) {
    const factura = await this._prisma.factura.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!factura) {
      throw new RpcException({ status: 404, message: `Factura con ID ${id} no encontrada` });
    }

    return factura;
  }

  async update(payload: { id: string; data: UpdateFacturaDto }) {
    const { id, data } = payload;

    // Validar que la factura exista
    const facturaExistente = await this._prisma.factura.findUnique({ where: { id } });

    if (!facturaExistente) {
      throw new RpcException({ status: 404, message: `Factura con ID ${id} no encontrada` });
    }

    // Eliminar ítems previos
    await this._prisma.item.deleteMany({ where: { facturaId: id } });

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
    const factura = await this._prisma.factura.findUnique({ where: { id } });

    if (!factura) {
      throw new RpcException({ status: 404, message: `Factura con ID ${id} no encontrada` });
    }

    await this._prisma.item.deleteMany({ where: { facturaId: id } });
    return this._prisma.factura.delete({ where: { id } });
  }
}
