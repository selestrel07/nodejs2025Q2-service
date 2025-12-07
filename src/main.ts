import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { BigIntInterceptor } from './utils/bigint-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new BigIntInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
