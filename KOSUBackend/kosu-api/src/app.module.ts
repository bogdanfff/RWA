import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './team/team.module';
import { typeOrmConfig } from 'typeorm.config';
import { TeamService } from './team/team.service';
import { LineService } from './line/line.service';
import { UserService } from './user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineModule } from './line/line.module';
import { SegmentModule } from './segment/segment.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HourlyModule } from './hourly/hourly.module';

@Module({
  imports: [
       TypeOrmModule.forRoot(typeOrmConfig),
       TeamsModule,
       UserModule,
       LineModule,
       SegmentModule,
       AuthModule,
       HourlyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
