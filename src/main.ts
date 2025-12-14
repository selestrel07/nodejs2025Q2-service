import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { BigIntInterceptor } from './utils/bigint-interceptor';
import { AppLogger } from './log/app.logger';
import { AppExceptionFilter } from './exception.filter';

async function bootstrap() {
  const logger = new AppLogger();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.useGlobalFilters(new AppExceptionFilter(logger));
  app.useGlobalInterceptors(new BigIntInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
