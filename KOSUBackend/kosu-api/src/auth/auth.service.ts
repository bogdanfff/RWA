import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: { username: string; password: string }) {
    const user = await this.validateUser(userDto.username, userDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const expiresIn = 3600;
    const token = this.jwtService.sign(
      { username: user.userName, sub: user.id },
      { expiresIn },
    );

    const refreshToken = randomUUID();


    // Store refresh token in database
    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      userName: user.userName,
      role: user.roleName,
      fullName: `${user.firstName} , ${user.lastName}`,
      returnInt: 0,
      returnText: `User=[${user.userName}] , Successfully logged in`,
      token,
      refreshToken,
      expiresIn,
    };
  }
}