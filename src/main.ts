import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('APP @main.ts');
  const app = await NestFactory.create(AppModule);

  const globalPrefx = 'api/v1';
  app.setGlobalPrefix(globalPrefx);

  try {
    const port = process.env.PORT;
    await app.listen(port, () => {
      logger.log('Listening at http://localhost:' + port + '/' + globalPrefx);
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
bootstrap();
