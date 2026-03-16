import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';
import { mapTeamToDto } from './dtos/team.dto';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) { }

    async findAll() {
        const teams = await this.teamRepository.find({
            relations: ['segment', 'teamLeader'],
        });
        return teams.map(mapTeamToDto);
    }

    async create(teamVal: Partial<Team>) {
        const team = this.teamRepository.create(teamVal);
        const savedTeam = await this.teamRepository.save(team);

        const teamWithRelations = await this.teamRepository.findOne({
            where: { id: savedTeam.id },
            relations: ['segment', 'teamLeader'],
        });

        if (!teamWithRelations) {
            throw new NotFoundException('Team not saved successfully');
        }

        return mapTeamToDto(teamWithRelations);
    }

    async updateTeam(id: number, team: Partial<Team>) {
        const updateResult = await this.teamRepository.update(id, team);

        if (updateResult.affected === 0) {
            throw new NotFoundException(`Team with id ${id} not found`);
        }

        const updatedTeam = await this.teamRepository.findOne({
            where: { id },
            relations: ['segment', 'teamLeader'],
        });

        if (!updatedTeam) {
            throw new BadRequestException(`Failed to load team ${id} after update`);
        }

        return mapTeamToDto(updatedTeam);
    }

    async deleteTeam(teamId: number) {
        const result = await this.teamRepository.delete(teamId);
        if (!result.affected) {
            throw new NotFoundException('Team not found');
        }
    }

}