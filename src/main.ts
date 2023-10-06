import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/store');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Smartsoft labs Api Store')
    .setDescription(
      `Esta es una API Rest que simula un ecommerce, cuenta con carrito de compras, sesiones mediante tokens y la posibilidad de crear productos.
    No maneja roles, por lo cual cualquiera puede modificar el producto.
    Primeramente se crea un carrito de compras el cual se le pueden añadir productos, luego, si se decide a realizar la compra, el carrito pasa a estar en estado purchase (1) y se genera el registro de la compra y a su vez los productos asociados a esa compra.
    `,
    )
    .setVersion('1.0')
    .addTag('Store')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
