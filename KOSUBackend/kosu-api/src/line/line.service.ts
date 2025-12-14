import { Injectable } from '@nestjs/common';
import { Line } from './entities/line.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LineService {
    constructor(
        @InjectRepository(Line)
        private readonly lineRepository: Repository<Line>,
    ) { }
    findAll(): Promise<Line[]> {
        return this.lineRepository.find();
    }
}
