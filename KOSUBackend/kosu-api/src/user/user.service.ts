import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Get all users
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Get one user by id
    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    // Get one user by username
    findByUsername(userName: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { userName } });
    }

    // Create new user
    create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    // Update existing user
    async update(id: number, userData: Partial<User>): Promise<User | null> {
        await this.userRepository.update(id, userData);
        return this.findOne(id);
    }

    // Delete user
    async deleteByUsername(userName: string): Promise<{ deleted: boolean }> {
        const result = await this.userRepository.delete({ userName });
        return { deleted: (result.affected ?? 0) > 0 };
    }
    async updateRefreshToken(userId: number, refreshToken: string) {
        await this.userRepository.update(userId, { refreshToken });
    }
}
