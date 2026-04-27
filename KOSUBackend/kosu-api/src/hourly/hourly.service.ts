import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Hourly } from './entities/hourly.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { HourlyResponseDto, mapHourlyToDto } from './dtos/hourly.dto';
import { Line } from 'src/line/entities/line.entity';
import { validateHourlyDate } from './helper/check-date';

@Injectable()
export class HourlyService {
    constructor(
        @InjectRepository(Hourly)
        private readonly hourlyRepository: Repository<Hourly>,
        @InjectRepository(Line)
        private readonly lineRepository: Repository<Line>,
    ) { }

    // ---- POMOĆNE FUNKCIJE ----

    private calculateEfficiency(produced: number, target: number): number {
        if (!target) return 0;
        return Math.min(+((produced / target) * 100).toFixed(2), 999.99);
    }

    private calculateAbsentism(actual: number, planned: number): number {
        if (!planned) return 0;
        const absent = planned - actual;
        return Math.min(+((absent / planned) * 100).toFixed(2), 999.99);
    }

    private async getLine(lineId?: number, fallbackId?: number): Promise<Line | null> {
        const id = lineId ?? fallbackId;
        if (!id) return null;
        return this.lineRepository.findOne({ where: { id } });
    }

    async findAll(teamId: number, assignedDate: Date): Promise<HourlyResponseDto[]> {
        const start = new Date(assignedDate);
        start.setHours(7, 0, 0, 0);

        const end = new Date(start);
        end.setDate(end.getDate() + 1); // sledeći dan u 07:00

        const hourlies = await this.hourlyRepository.find({
            where: {
                teamId,
                inputDate: Between(start, end),
            },
            relations: ['team'],
        });

        return hourlies.map(mapHourlyToDto);;
    }

    async create(hourlyVal: Hourly) {
        const line = await this.getLine(hourlyVal.lineId);
        if (!line) throw new NotFoundException('Incorrect values');
        validateHourlyDate(line);
        const plannedTarget = line?.assignedTarget ?? 0;
        const plannedEmployees = line?.assignedEmployeesNo ?? 1;

        const hourly = this.hourlyRepository.create({
            ...hourlyVal,
            plannedProductNo: +(plannedTarget / 8).toFixed(2),
            plannedEmployeesNo: plannedEmployees,
            efficiencyE1: this.calculateEfficiency(hourlyVal.producedProductNo, plannedTarget / 8),
            absentism: this.calculateAbsentism(hourlyVal.employeesNo, plannedEmployees),
        });

        const newHourly = await this.hourlyRepository.save(hourly);
        const returnHourly = await this.hourlyRepository.findOne({
            where: { id: newHourly.id },
            relations: ['line', 'team'],
        });

        if (!returnHourly) throw new NotFoundException('Hourly not saved successfully');
        return mapHourlyToDto(returnHourly);
    }

    async update(id: number, hourlyVal: Partial<Hourly>) {
        const existingHourly = await this.hourlyRepository.findOne({ where: { id } });
        if (!existingHourly) throw new NotFoundException(`Hourly with id ${id} not found`);

        const line = await this.getLine(hourlyVal.lineId, existingHourly.lineId);
        const plannedTarget = line?.assignedTarget ?? existingHourly.plannedProductNo * 8;
        const plannedEmployees = line?.assignedEmployeesNo ?? existingHourly.plannedEmployeesNo;

        const updatedHourly = this.hourlyRepository.create({
            ...existingHourly,
            ...hourlyVal,
            plannedProductNo: +(plannedTarget / 8).toFixed(2),
            plannedEmployeesNo: plannedEmployees,
            efficiencyE1: this.calculateEfficiency(hourlyVal.producedProductNo ?? existingHourly.producedProductNo, plannedTarget / 8),
            absentism: this.calculateAbsentism(hourlyVal.employeesNo ?? existingHourly.employeesNo, plannedEmployees),
        });

        await this.hourlyRepository.save(updatedHourly);

        const returnHourly = await this.hourlyRepository.findOne({
            where: { id },
            relations: ['line', 'team'],
        });

        if (!returnHourly) throw new BadRequestException(`Failed to load hourly ${id} after update`);
        return mapHourlyToDto(returnHourly);
    }

    async deleteHourly(hourlyId: number) {
        const result = await this.hourlyRepository.delete(hourlyId);
        if (!result.affected) throw new NotFoundException('Hourly not found');
    }
}