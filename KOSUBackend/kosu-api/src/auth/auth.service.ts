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

    const token = this.jwtService.sign(
      { username: user.userName, sub: user.id }
    );

    const refreshToken = randomUUID();

    await this.userService.update(user.id, {refreshToken});

    return {
      userId:user.id,
      userName: user.userName,
      role: user.roleName,
      fullName: `${user.firstName} , ${user.lastName}`,
      returnInt: 0,
      returnText: `User=[${user.userName}] , Successfully logged in`,
      token,
      refreshToken,
    };
  }
  async refreshAccessToken(refreshToken: string) {
  if (!refreshToken) {
    throw new UnauthorizedException('No refresh token provided');
  }
  const user = await this.userService.findByRefreshToken(refreshToken);

  if (!user) {
    throw new UnauthorizedException('Invalid refresh token');
  }
  const payload = {
    username: user.userName,
    sub: user.id,
  };

  const newAccessToken = this.jwtService.sign(payload);
  const newRefreshToken = randomUUID();
  await this.userService.update(user.id, {refreshToken:newRefreshToken});

  return {
    returnInt: 200,
    newAccessToken,
    newRefreshToken,
  };
}
}