import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Segment } from './entities/segment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mapSegmentToDto } from './dtos/segment.dto';

@Injectable()
export class SegmentService {
    constructor(
        @InjectRepository(Segment)
        private readonly segmentRepository: Repository<Segment>,
    ) { }
    async findAll() {
        const segments = await this.segmentRepository.find(
            {
                relations: ['segmentLeader'],
            });
        return segments.map(mapSegmentToDto);
    }

    async create(segmentVal: Segment) {
        const segment = this.segmentRepository.create(segmentVal);
        const newSegment = await this.segmentRepository.save(segment);
        const returnSegment = await this.segmentRepository.findOne({
            where: { id: newSegment.id },
            relations: ['segmentLeader'],
        });
        if (!returnSegment) {
            throw new NotFoundException('Segment not saved successfully');
        }
        return mapSegmentToDto(returnSegment); // vrati DTO
    }

    async update(id: number, team: Partial<Segment>) {
            const updateResult = await this.segmentRepository.update(id, team);
    
            if (updateResult.affected === 0) {
                throw new NotFoundException(`Team with id ${id} not found`);
            }
    
            const updatedSegment = await this.segmentRepository.findOne({
                where: { id },
                relations: ['segmentLeader'],
            });
    
            if (!updatedSegment) {
                throw new BadRequestException(`Failed to load team ${id} after update`);
            }
    
            return mapSegmentToDto(updatedSegment);
        }

    async deleteSegment(segmentId: number) {
        const result = await this.segmentRepository.delete(segmentId);
        if (!result.affected) {
            throw new NotFoundException('Team not found');
        }
    }

}
// private mapTeamToDto(segment: Segment) {
//         return {
//             id: team.id,
//             teamName: team.teamName,
//             description: team.description,
//             teamLeader: team.teamLeader?.userName,
//             teamLeaderId: team.teamLeader?.id,
//             segmentName: team.segment?.segmentName,
//             segmentId: team.segmentId,
//             createDate: team.createDate,
//         };
//     }

