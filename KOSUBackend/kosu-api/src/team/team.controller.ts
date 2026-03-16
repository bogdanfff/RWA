import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';

@Controller('Teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamService) {}
    
    @Get()
    getAllTeams() {
        return this.teamsService.findAll()
    }

    @Post()
    addTeam(@Body() team:Partial<Team>) {
        return this.teamsService.create(team)
    }

    @Put(':id')
    updateTeam( @Param('id') id: number,@Body() team:Team){
        return this.teamsService.updateTeam(id,team)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTeam(@Param('id') id:number ) {
        await this.teamsService.deleteTeam(id)
    }
}
