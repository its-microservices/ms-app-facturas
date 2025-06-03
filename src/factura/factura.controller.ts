import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Controller()
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @MessagePattern('createFactura')
  create(@Payload() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  @MessagePattern('findAllFactura')
  findAll() {
    return this.facturaService.findAll();
  }

  @MessagePattern('findOneFactura')
  findOne(@Payload() id: number) {
    return this.facturaService.findOne(id);
  }

  @MessagePattern('updateFactura')
  update(@Payload() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(updateFacturaDto.id, updateFacturaDto);
  }

  @MessagePattern('removeFactura')
  remove(@Payload() id: number) {
    return this.facturaService.remove(id);
  }
}
