import { Injectable } from '@nestjs/common';
import { Segment } from './entities/segment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SegmentService {
    constructor(
        @InjectRepository(Segment)
        private readonly segmentRepository: Repository<Segment>,
    ) { }
}
