import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('Teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamService) {}
    
    @Get()
    getAllTeams() {
        return this.teamsService.findAll()
    }
}
