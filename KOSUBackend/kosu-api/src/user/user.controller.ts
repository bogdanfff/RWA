import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('User')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // GET /user - get all users
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    // GET /user/:id - get a single user
    @Get(':id')
    getUser(@Param('id') id: number): Promise<User | null> {
        return this.userService.findOne(id);
    }

    // POST /user - create a new user
    @Post()
    createUser(@Body() userData: Partial<User>): Promise<User> {
        return this.userService.create(userData);
    }

    // PUT /user/:id - update an existing user
    @Put(':id')
    updateUser(
        @Param('id') id: number,
        @Body() userData: Partial<User>,
    ): Promise<User | null> {
        return this.userService.update(id, userData);
    }

    // DELETE /user/:id - remove a user
    @Delete(':userName')
    async deleteByUsername(@Param('userName') userName: string) {
        return this.userService.deleteByUsername(userName);
    }
}
