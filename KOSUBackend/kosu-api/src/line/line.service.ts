import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Line } from './entities/line.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineResponseDto, mapLineToDto } from './dtos/line.dto';

@Injectable()
export class LineService {
    constructor(
        @InjectRepository(Line)
        private readonly lineRepository: Repository<Line>,
    ) { }
    async findAll(): Promise<LineResponseDto[]> {
        const linesReturn = await this.lineRepository.find({relations: ['segmentName','assignedTeam']});
        return linesReturn.map(mapLineToDto)
    }

    async create(lineVal: Line) {
        const line = this.lineRepository.create(lineVal);
        const newLine = await this.lineRepository.save(line);
        const returnLine = await this.lineRepository.findOne({
            where: { id: newLine.id },
            relations: ['segmentName','assignedTeam'],
        });
        if (!returnLine) {
            throw new NotFoundException('Line not saved successfully');
        }
        return mapLineToDto(returnLine);
    }

    async update(id: number, line: Partial<Line>) {
        const updateResult = await this.lineRepository.update(id, line);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        const updatedLine = await this.lineRepository.findOne({
            where: { id },
            relations: ['segmentName','assignedTeam'],
        });

        if (!updatedLine) {
            throw new BadRequestException(`Failed to load team ${id} after update`);
        }

        return mapLineToDto(updatedLine);
    }

    async deleteLine(lineId: number) {
        const result = await this.lineRepository.delete(lineId);
        if (!result.affected) {
            throw new NotFoundException('Team not found');
        }
    }

}
