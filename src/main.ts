import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('APP @main.ts');
  const app = await NestFactory.create(AppModule);

  const globalPrefx = 'api/v1';
  app.setGlobalPrefix(globalPrefx);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('RecetApp - Proyecto M12')
    .setDescription('Documentación API de RecetApp')
    .setTermsOfService('http://swagger.io/terms/')
    .setContact(
      'Dan Marius Dumitrescu',
      'https://danmarius.dev',
      'hola@danmarius.dev',
    )
    .setLicense('MIT', 'http://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'RecetApp API Docs',
  };
  SwaggerModule.setup('', app, swaggerDocument, swaggerCustomOptions);

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
