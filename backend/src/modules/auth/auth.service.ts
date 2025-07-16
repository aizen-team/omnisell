// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { RegisterDto } from '@/dto/auth/register.dto';
import { LoginDto } from '@/dto/auth/login.dto';
import { AuthResponseDto } from '@/dto/auth/auth-response.dto';
import { User } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // User registration
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const userExists = await this.usersService.existsByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = await this.usersService.create(registerDto);

    // Generate JWT token
    const token = await this.generateToken(user);

    return {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 3600, // 1 hour
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_active: user.is_active,
      },
    };
  }

  // User login
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Find user by email
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Generate JWT token
    const token = await this.generateToken(user);

    return {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 3600, // 1 hour
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_active: user.is_active,
      },
    };
  }

  // Validate user credentials
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findByEmail(email);
      const isPasswordValid = await user.validatePassword(password);

      if (isPasswordValid) {
        return user;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Generate JWT token
  private async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  // Validate JWT token and return user
  async validateToken(payload: any): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user || !user.is_active) {
      throw new UnauthorizedException('Invalid token or user inactive');
    }

    return user;
  }
}