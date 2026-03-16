import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UserDto } from './dtos/user.dto';

@Controller('Users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // GET /user - get all users
    @Get()
    getAllUsers(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    // GET /user/:id - get a single user
    @Get(':id')
    getUser(@Param('id') id: number): Promise<UserDto | null> {
        return this.userService.findOne(id);
    }

    @Post()
    addUser(@Body() userData: CreateUserDto): Promise<UserDto> {
        return this.userService.create(userData);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: number,
        @Body() userData: Partial<User>,
    ): Promise<UserDto | null> {
        return this.userService.update(id, userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
