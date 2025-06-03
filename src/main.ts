import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
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
  console.log('Factura microservice is running on port 4002');
}
bootstrap();