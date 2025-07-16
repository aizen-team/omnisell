// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true,
  });

  // API prefix
  app.setGlobalPrefix('api/v1');

  // 🔑 Swagger configuration với Bearer Auth
  const config = new DocumentBuilder()
    .setTitle('OmniSell API')
    .setDescription(`
      ## OmniSell - Nền Tảng Bán Hàng Đa Kênh Tích Hợp AI Assistant

      ### Features:
      - 🔗 Kết nối tài khoản Shopee, TikTok Shop, Facebook Shop
      - 📦 Đồng bộ sản phẩm, đơn hàng và tồn kho
      - 💬 Hộp thư tin nhắn hợp nhất (Omni Inbox)
      - 🤖 AI Assistant gợi ý phản hồi tin nhắn, đánh giá
      - 📊 Thống kê doanh thu, hiệu suất sản phẩm
      - 🔔 Cảnh báo đơn hủy, hàng sắp hết tồn
      - 🧠 Chatbot AI chăm sóc khách hàng theo kịch bản (sắp triển khai)

      ### How to use:
      1. **Register** a new user or **Login** with existing credentials
      2. **Copy** the \`accessToken\` from the response
      3. **Click** the 🔒 Authorize button at the top
      4. **Paste** the token in the value field (without "Bearer " prefix)
      5. **Click** Authorize and Close
      6. Now you can test protected endpoints! 🚀

      ### Test Credentials:
      - Email: \`test@example.com\`
      - Password: \`password123\`
    `)
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching references
    )
    .addTag('Authentication', 'User authentication endpoints (login, register)')
    .addTag('Users', 'User management endpoints (CRUD operations)')
    .addServer('http://localhost:3001', 'Development server')
    .addServer('https://api.yourapp.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Customize the document
  document.info.contact = {
    name: 'API Support',
    email: 'support@yourapp.com',
    url: 'https://yourapp.com/support',
  };

  document.info.license = {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  };

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 🔑 Giữ token sau khi refresh
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showRequestHeaders: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'User Management API Documentation',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`🔑 Click the 'Authorize' button in Swagger to add your JWT token`);
}

bootstrap();