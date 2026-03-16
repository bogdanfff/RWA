import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dtos/login.dto';
import { get } from 'http';

@Controller('Login')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('CheckRefreshToken')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    // Only accessible with valid JWT
    return req.user;
  }
}
