#!/bin/bash

echo "🚀 Setting up Full Stack Application with Docker..."

# Tạo cấu trúc thư mục
echo "📁 Creating project structure..."
mkdir -p {backend/src,frontend/src,init-db}

# Tạo docker-compose.yml
echo "🐳 Creating docker-compose.yml..."
cat > docker-compose.yml << 'EOF'
# Paste docker-compose.yml content here
EOF

# Tạo file environment
echo "⚙️ Creating environment files..."
cat > .env << 'EOF'
# Database
DATABASE_URL=postgresql://postgres:password123@postgres:5432/myapp
POSTGRES_DB=myapp
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Mail Configuration (MailHog)
SMTP_HOST=mailhog
SMTP_PORT=1025
MAIL_FROM=noreply@example.com

# URLs
FRONTEND_URL=http://localhost:3000
API_URL=http://nestjs-api:3000

# Next.js Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development

# pgAdmin (optional)
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
EOF

# Copy env files
cp .env backend/.env
cp .env frontend/.env.local

# Tạo backend structure
echo "🏗️ Setting up NestJS backend..."
cd backend

# Tạo package.json cho backend
cat > package.json << 'EOF'
{
  "name": "nestjs-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/jwt": "^10.1.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/swagger": "^7.1.0",
    "@nestjs/cache-manager": "^2.1.0",
    "@nestjs/bull": "^10.0.0",
    "typeorm": "^0.3.17",
    "pg": "^8.11.0",
    "redis": "^4.6.0",
    "cache-manager": "^5.2.0",
    "cache-manager-redis-store": "^3.0.1",
    "bull": "^4.11.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "bcrypt": "^5.1.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "nodemailer": "^6.9.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@types/bcrypt": "^5.0.0",
    "@types/passport-jwt": "^3.0.9",
    "@types/passport-local": "^1.0.35",
    "@types/nodemailer": "^6.4.8",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.1",
    "typescript": "^5.1.3"
  }
}
EOF

# Tạo tsconfig.json
cat > tsconfig.json << 'EOF'
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
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
EOF

# Tạo nest-cli.json
cat > nest-cli.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
EOF

# Tạo main.ts
mkdir -p src
cat > src/main.ts << 'EOF'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 NestJS server is running on http://localhost:3000');
}
bootstrap();
EOF

# Tạo app.controller.ts
cat > src/app.controller.ts << 'EOF'
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
      uptime: process.uptime(),
    };
  }
}
EOF

# Tạo app.service.ts
cat > src/app.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from NestJS!';
  }
}
EOF

cd ..

# Tạo frontend structure
echo "🎨 Setting up Next.js frontend..."
cd frontend

# Tạo package.json cho frontend
cat > package.json << 'EOF'
{
  "name": "nextjs-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.5.0",
    "@tanstack/react-query": "^4.36.1",
    "@hookform/resolvers": "^3.3.2",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.4",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "lucide-react": "^0.292.0",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.25",
    "@types/react-dom": "^18.2.11",
    "eslint": "^8.51.0",
    "eslint-config-next": "14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.7.5",
    "@typescript-eslint/parser": "^6.7.5",
    "prettier": "^3.0.3",
    "prettier-plugin-tailwindcss": "^0.5.6"
  }
}
EOF

# Tạo tsconfig.json cho frontend
cat > tsconfig.json << 'EOF'
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

# Tạo next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  
  output: 'standalone',
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3001'}/:path*`,
      },
    ];
  },
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
EOF

# Tạo src structure
mkdir -p src/app
cat > src/app/layout.tsx << 'EOF'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Full Stack App',
  description: 'Built with Next.js and NestJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF

cat > src/app/page.tsx << 'EOF'
'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(data => {
        setMessage(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setMessage('Error connecting to API')
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🚀 Full Stack Application
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">API Connection Status</h2>
          {loading ? (
            <div className="animate-pulse">Loading...</div>
          ) : (
            <div className="text-green-600 font-medium">{message}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🎨 Frontend</h3>
            <p className="text-gray-600">Next.js 14 with TypeScript</p>
            <p className="text-sm text-gray-500 mt-2">Port: 3000</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🚀 Backend</h3>
            <p className="text-gray-600">NestJS with TypeScript</p>
            <p className="text-sm text-gray-500 mt-2">Port: 3001</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🐘 Database</h3>
            <p className="text-gray-600">PostgreSQL</p>
            <p className="text-sm text-gray-500 mt-2">Port: 5432</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🔴 Cache</h3>
            <p className="text-gray-600">Redis</p>
            <p className="text-sm text-gray-500 mt-2">Port: 6379</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-600">MailHog</p>
            <p className="text-sm text-gray-500 mt-2">
              <a href="http://localhost:8025" className="text-blue-500 hover:underline">
                Web UI: Port 8025
              </a>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🔧 Admin</h3>
            <p className="text-gray-600">pgAdmin</p>
            <p className="text-sm text-gray-500 mt-2">
              <a href="http://localhost:5050" className="text-blue-500 hover:underline">
                Web UI: Port 5050
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
EOF

cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer base {
  :root {
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
    --foreground-rgb: 0, 0, 0;
  }
}
EOF

# Tạo tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

cd ..

# Tạo database initialization script
echo "🗄️ Creating database initialization script..."
cat > init-db/01-init.sql << 'EOF'
-- Create additional databases if needed
-- CREATE DATABASE testdb;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sample table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (email, name) VALUES 
('user1@example.com', 'John Doe'),
('user2@example.com', 'Jane Smith')
ON CONFLICT (email) DO NOTHING;
EOF

# Install dependencies locally (optional - for development)
echo "📦 Installing dependencies..."
echo "You can install dependencies locally for development:"
echo "  cd backend && npm install"
echo "  cd frontend && npm install"

# Build và start containers
echo "🐳 Building and starting Docker containers..."
docker-compose up --build -d

# Chờ containers khởi động
echo "⏳ Waiting for services to start..."
sleep 30

# Kiểm tra trạng thái services
echo "✅ Checking service status..."
docker-compose ps

echo ""
echo "🎉 Setup completed! Services are running on:"
echo "🌐 Next.js Frontend: http://localhost:3000"
echo "🚀 NestJS API: http://localhost:3001"
echo "🐘 PostgreSQL: localhost:5432"
echo "🔴 Redis: localhost:6379"
echo "📧 MailHog Web UI: http://localhost:8025"
echo "🔧 pgAdmin: http://localhost:5050"
echo ""
echo "📋 Useful Docker commands:"
echo "  docker-compose logs -f [service-name]  # View logs"
echo "  docker-compose restart [service-name]  # Restart service"
echo "  docker-compose down                    # Stop all services"
echo "  docker-compose up -d                   # Start all services"
echo ""
echo "🔍 To check email in MailHog, visit: http://localhost:8025"
echo "🗃️ To access pgAdmin, visit: http://localhost:5050"
echo "   Email: admin@example.com"
echo "   Password: admin123"