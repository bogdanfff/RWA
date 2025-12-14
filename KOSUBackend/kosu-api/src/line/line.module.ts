import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { Line } from './entities/line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
      TypeOrmModule.forFeature([Line]),
    ],
  controllers: [LineController],
  providers: [LineService]
})
export class LineModule {}
