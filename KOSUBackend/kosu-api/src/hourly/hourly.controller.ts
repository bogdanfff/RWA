import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { HourlyService } from './hourly.service';
import { Hourly } from './entities/hourly.entity';

@Controller('Hourly')
export class HourlyController {
    constructor(private readonly hourlyService: HourlyService) { }
    @Get()
    getAllHourlys(
        @Query('teamId') teamId: number,
        @Query('assignedDate') assignedDate: string
    ) {
        const date = new Date(assignedDate);
        return this.hourlyService.findAll(teamId, date);
    }

    @Post()
    addhourly(@Body() hourly: Hourly) {
        return this.hourlyService.create(hourly);
    }

    @Patch(':id')
    updateHourly(
        @Param('id') id: number,
        @Body() hourlyData: Partial<Hourly>,
    ) {
        return this.hourlyService.update(id, hourlyData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletehourly(@Param('id') id: number) {
        await this.hourlyService.deleteHourly(id)
    }

    //NA ASSIGN TREBA DA ZAPAMTIM KO JE ASSIGNOVAO
}
