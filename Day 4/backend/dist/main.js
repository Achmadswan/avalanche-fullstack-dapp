"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Simple Storage dApp API')
        .setDescription(`
Nama : Achmad SWAN

Nim  : 231011402106
      `)
        .setVersion('1.0.0')
        .addTag('simple-storage', 'Smart contract interaction endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('documentation', app, document, {
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
//# sourceMappingURL=main.js.map