#!/bin/bash

echo "🚀 Quick Setup Full Stack Application..."

# Tạo docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: redis_cache
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    networks:
      - app-network

  mailhog:
    image: mailhog/mailhog:latest
    container_name: mailhog
    restart: unless-stopped
    ports:
      - "1025:1025"
      - "8025:8025"
    networks:
      - app-network

  nestjs-api:
    image: node:18-alpine
    container_name: nestjs_api
    working_dir: /app
    ports:
      - "3001:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password123@postgres:5432/myapp
      REDIS_URL: redis://redis:6379
      SMTP_HOST: mailhog
      SMTP_PORT: 1025
      JWT_SECRET: your-jwt-secret-key
    depends_on:
      - postgres
      - redis
      - mailhog
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - app-network
    command: sh -c "npm install && npm run start:dev"

  nextjs-frontend:
    image: node:18-alpine
    container_name: nextjs_frontend
    working_dir: /app
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
      API_URL: http://nestjs-api:3000
    depends_on:
      - nestjs-api
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    networks:
      - app-network
    command: sh -c "npm install && npm run dev"

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
EOF

echo "📁 Creating project structure..."
mkdir -p backend/src frontend/src

# Tạo backend package.json
cat > backend/package.json << 'EOF'
{
  "name": "nestjs-backend",
  "version": "0.0.1",
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "typeorm": "^0.3.17",
    "pg": "^8.11.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "typescript": "^5.1.3",
    "ts-node": "^10.9.1"
  }
}
EOF

# Tạo backend main files
cat > backend/src/main.ts << 'EOF'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 NestJS server is running on http://localhost:3000');
}
bootstrap();
EOF

cat > backend/src/app.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
EOF

cat > backend/src/app.controller.ts << 'EOF'
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
EOF

cat > backend/src/app.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from NestJS API!';
  }
}
EOF

cat > backend/nest-cli.json << 'EOF'
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src"
}
EOF

cat > backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true
  }
}
EOF

# Tạo frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "nextjs-frontend",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.25",
    "@types/react-dom": "^18.2.11"
  }
}
EOF

# Tạo frontend files
mkdir -p frontend/src/app
cat > frontend/src/app/layout.tsx << 'EOF'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOF

cat > frontend/src/app/page.tsx << 'EOF'
'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Error connecting to API'))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Full Stack Application</h1>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h2>API Response:</h2>
        <p>{message}</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Services:</h2>
        <ul>
          <li>Frontend (Next.js): <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></li>
          <li>Backend (NestJS): <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></li>
          <li>PostgreSQL: localhost:5432</li>
          <li>Redis: localhost:6379</li>
          <li>MailHog: <a href="http://localhost:8025" target="_blank">http://localhost:8025</a></li>
          <li>pgAdmin: <a href="http://localhost:5050" target="_blank">http://localhost:5050</a></li>
        </ul>
      </div>
    </div>
  )
}
EOF

cat > frontend/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nestjs-api:3000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
EOF

cat > frontend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Tạo environment files
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:password123@postgres:5432/myapp
POSTGRES_DB=myapp
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
REDIS_URL=redis://redis:6379
SMTP_HOST=mailhog
SMTP_PORT=1025
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
EOF

echo "🐳 Starting Docker containers..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "✅ Setup completed!"
echo ""
echo "🌐 Services available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:3001"
echo "  MailHog: http://localhost:8025"
echo "  pgAdmin: http://localhost:5050"
echo ""
echo "📋 Useful commands:"
echo "  docker-compose logs -f          # View all logs"
echo "  docker-compose logs -f nestjs-api   # View backend logs"
echo "  docker-compose logs -f nextjs-frontend  # View frontend logs"
echo "  docker-compose restart [service]    # Restart a service"
echo "  docker-compose down             # Stop all services"