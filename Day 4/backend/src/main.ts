import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple Storage dApp API')
    .setDescription(
      `
Nama : Achmad SWAN

Nim  : 231011402106
      `,
    )
    .setVersion('1.0.0')
    .addTag('simple-storage', 'Smart contract interaction endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, document, {
    customSiteTitle: 'Simple Storage dApp API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      showExtensions: true,
    },
    customCss: `
      .topbar {
        background-color: #0f172a;
      }
      .topbar-wrapper img {
        content: url('https://nestjs.com/img/logo-small.svg');
        width: 40px;
      }
      .swagger-ui .info h1 {
        color: #0f172a;
      }
      .swagger-ui .opblock.opblock-post {
        border-color: #2563eb;
        background: rgba(37, 99, 235, 0.05);
      }
      .swagger-ui .opblock.opblock-get {
        border-color: #16a34a;
        background: rgba(22, 163, 74, 0.05);
      }
    `,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});
