import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacturaModule } from './factura/factura.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [FacturaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
