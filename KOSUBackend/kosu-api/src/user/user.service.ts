import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, mapUserToDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['team'],
    });

    return users.map(mapUserToDto);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return mapUserToDto(user);
  }

  async findByUsername(userName: string) {
    return this.userRepository.findOne({
      where: { userName },
      relations: ['team'],
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.userRepository.findOne({
      where: { refreshToken },
    });
  }

  async create(userData: CreateUserDto) {
    const user = this.userRepository.create(userData);

    const newUser = await this.userRepository.save(user);

    const returnUser = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: ['team'],
    });

    if (!returnUser) {
      throw new NotFoundException('User not saved successfully');
    }

    return mapUserToDto(returnUser);
  }

  async update(userId: number, userData: Partial<User>) {
    const updateResult = await this.userRepository.update(userId, userData);

    if (updateResult.affected === 0) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['team'],
    });

    if (!updatedUser) {
      throw new BadRequestException(`Failed to load user ${userId} after update`);
    }

    return mapUserToDto(updatedUser);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('User not found');
    }

    return { deleted: true };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.userRepository.update(userId, { refreshToken });
  }
}