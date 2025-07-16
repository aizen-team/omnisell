// src/entities/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  import * as bcrypt from 'bcryptjs';
  
  export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
  }

  export enum AccountType {
    LOCAL = 'local',
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
  }
  
  @Entity('users')
  export class User {
    @ApiProperty({
      description: 'User unique identifier',
      example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ApiProperty({
      description: 'User email address',
      example: 'user@example.com',
    })
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @ApiProperty({
      description: 'User first name',
      example: 'John',
    })
    @Column({ type: 'varchar', length: 100 })
    first_name: string;
  
    @ApiProperty({
      description: 'User last name',
      example: 'Doe',
    })
    @Column({ type: 'varchar', length: 100 })
    last_name: string;
  
    @ApiProperty({
      description: 'User password (hashed)',
      example: 'hashedPassword123',
      writeOnly: true,
    })
    @Column({ type: 'varchar', length: 255 })
    @Exclude()
    password: string;
  
    @ApiProperty({
      description: 'User role',
      enum: UserRole,
      example: UserRole.USER,
    })
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role: UserRole;

    @ApiProperty({
      description: 'User account type',
      enum: AccountType,
      example: AccountType.LOCAL,
    })
    @Column({
      type: 'enum',
      enum: AccountType,
      default: AccountType.LOCAL,
    })
    account_type: AccountType;  
  
    @ApiProperty({
      description: 'User account status',
      example: false,
    })
    @Column({ type: 'boolean', default: false })
    is_active: boolean;
  
    @ApiProperty({
      description: 'Account creation timestamp',
      example: '2024-01-01T00:00:00Z',
    })
    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;
  
    @ApiProperty({
      description: 'Account last update timestamp',
      example: '2024-01-01T00:00:00Z',
    })
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;
  
    // Hash password before saving
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password && !this.password.startsWith('$2')) {
        this.password = await bcrypt.hash(this.password, 12);
      }
    }
  
    // Method to validate password
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  
    // Virtual property for full name
    get full_name(): string {
      return `${this.first_name} ${this.last_name}`;
    }
  }