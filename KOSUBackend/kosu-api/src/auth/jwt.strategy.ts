import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  async validate(payload: any) {
     const user = await this.userService.findOne(payload.sub);

    if (!user || !user.active) {
      throw new UnauthorizedException('User not authorized');
    }

    // This becomes req.user
    return {
      id: user.id,
      username: user.userName,
      role: user.roleName,
    };
  }
}
