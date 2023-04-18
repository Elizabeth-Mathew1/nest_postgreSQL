import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception-filter/http-exception-filter.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter())
  let options = new DocumentBuilder()
  options=options.setTitle('Coffees App')
  options=options.setDescription('An application for fetching and retreiving coffee details')
  options=options.setVersion('0.3')
  const Docoptions=options.build();
  const document=SwaggerModule.createDocument(app,Docoptions)
  SwaggerModule.setup('api',app,document) // api is the route path for opening the UI
  await app.listen(3000);
}
bootstrap();
