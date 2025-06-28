// src/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { PaginationQueryDto } from '../dto/common/pagination-query.dto';
import { PaginatedResponseDto } from '../dto/common/pagination-response.dto';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    // Return user without password
    const { password, ...userWithoutPassword } = savedUser;
    return savedUser;
  }

  // Get all users with pagination
  async findAll(paginationQuery: PaginationQueryDto): Promise<PaginatedResponseDto<User>> {
    const page = paginationQuery.page ?? 1;
const limit = paginationQuery.limit ?? 10;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at', 'updated_at'],
      skip,
      take: limit,
      order: { created_at: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  // Get user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at', 'updated_at'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Get user by email (for authentication)
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    const user = await this.findOne(id);

    // Check if email is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Update user
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return updatedUser;
  }

  // Delete user
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Check if user exists by email
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepository.count({
      where: { email },
    });
    return count > 0;
  }

  // Get user statistics
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    admins: number;
    users: number;
  }> {
    const [total, active, admins] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({ where: { is_active: true } }),
      this.userRepository.count({ where: { role: UserRole.ADMIN } }),
    ]);

    return {
      total,
      active,
      inactive: total - active,
      admins,
      users: total - admins,
    };
  }
}