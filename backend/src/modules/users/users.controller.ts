// src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
    ApiBody,
  } from '@nestjs/swagger';
  import { UsersService } from './users.service';
  import { CreateUserDto } from '@/dto/user/create-user.dto';
  import { UpdateUserDto } from '@/dto/user/update-user.dto';
  import { PaginationQueryDto } from '@/dto/common/pagination-query.dto';
  import { PaginatedResponseDto } from '@/dto/common/pagination-response.dto';
  import { User } from '@/entities/user.entity';
  import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
  import { RolesGuard } from '@/modules/auth/guards/roles.guard';
  
  @ApiTags('Users')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    @ApiOperation({
      summary: 'Create new user',
      description: 'Create a new user account (Admin only)',
    })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
      status: 201,
      description: 'User created successfully',
      type: User,
    })
    @ApiResponse({
      status: 400,
      description: 'Bad request - Invalid input data',
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    })
    @ApiResponse({
      status: 409,
      description: 'Conflict - User with email already exists',
    })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      console.log('>> TEST creste');
      return this.usersService.create(createUserDto);
    }
  
    @Get()
    @ApiOperation({
      summary: 'Get all users',
      description: 'Retrieve all users with pagination',
    })
    @ApiQuery({ type: PaginationQueryDto })
    @ApiResponse({
      status: 200,
      description: 'Users retrieved successfully',
      type: PaginatedResponseDto<User>,
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    })
    async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<PaginatedResponseDto<User>> {
      return this.usersService.findAll(paginationQuery);
    }
  
    @Get('stats')
    @ApiOperation({
      summary: 'Get user statistics',
      description: 'Get statistics about users (total, active, inactive, etc.)',
    })
    @ApiResponse({
      status: 200,
      description: 'User statistics retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          total: { type: 'number', example: 100 },
          active: { type: 'number', example: 85 },
          inactive: { type: 'number', example: 15 },
          admins: { type: 'number', example: 5 },
          users: { type: 'number', example: 95 },
        },
      },
    })
    async getStats() {
      return this.usersService.getStats();
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'Get user by ID',
      description: 'Retrieve a specific user by their ID',
    })
    @ApiParam({
      name: 'id',
      description: 'User unique identifier (UUID)',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiResponse({
      status: 200,
      description: 'User retrieved successfully',
      type: User,
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    })
    @ApiResponse({
      status: 404,
      description: 'User not found',
    })
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
      return this.usersService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({
      summary: 'Update user',
      description: 'Update user information by ID',
    })
    @ApiParam({
      name: 'id',
      description: 'User unique identifier (UUID)',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
      status: 200,
      description: 'User updated successfully',
      type: User,
    })
    @ApiResponse({
      status: 400,
      description: 'Bad request - Invalid input data',
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    })
    @ApiResponse({
      status: 404,
      description: 'User not found',
    })
    @ApiResponse({
      status: 409,
      description: 'Conflict - Email already exists',
    })
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.usersService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @ApiOperation({
      summary: 'Delete user',
      description: 'Delete a user by ID',
    })
    @ApiParam({
      name: 'id',
      description: 'User unique identifier (UUID)',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiResponse({
      status: 200,
      description: 'User deleted successfully',
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    })
    @ApiResponse({
      status: 404,
      description: 'User not found',
    })
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
      await this.usersService.remove(id);
      return { message: 'User deleted successfully' };
    }
  }