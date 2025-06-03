import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('MS-FACTURAS main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
    transport: Transport.TCP,
    options: {
      host: envs.HOST,
      port: envs.PORT
    }
  }
  );

  await app.listen();

  logger.log(`Factura microservice is running on ${envs.DB_HOST}:${envs.PORT}`);
}
bootstrap();