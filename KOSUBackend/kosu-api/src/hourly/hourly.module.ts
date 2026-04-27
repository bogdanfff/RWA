import { Module } from '@nestjs/common';
import { HourlyController } from './hourly.controller';
import { HourlyService } from './hourly.service';
import { Hourly } from './entities/hourly.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from 'src/line/entities/line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hourly, Line]),
  ],
  controllers: [HourlyController],
  providers: [HourlyService]
})
export class HourlyModule { }
