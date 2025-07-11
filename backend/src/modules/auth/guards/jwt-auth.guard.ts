// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    this.logger.log(`Auth header received: ${authHeader ? 'Present' : 'Missing'}`);
    
    if (authHeader) {
      this.logger.log(`Auth header format: ${authHeader.substring(0, 20)}...`);
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    this.logger.log('JWT Guard - Handle request called');
    
    if (err) {
      this.logger.error(`JWT Guard error: ${err.message}`);
      throw err;
    }
    
    if (!user) {
      this.logger.error(`JWT Guard - No user found. Info: ${info?.message}`);
      throw new UnauthorizedException('Authentication failed');
    }

    this.logger.log(`JWT Guard - User authenticated: ${user.email}`);
    return user;
  }
}