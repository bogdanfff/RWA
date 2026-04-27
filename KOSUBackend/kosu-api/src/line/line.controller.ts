import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { LineService } from './line.service';
import { Line } from './entities/line.entity';

@Controller('Lines')
export class LineController {
    constructor(private readonly lineService: LineService) { }
    @Get()
    getAllLines() {
        return this.lineService.findAll()
    }

    @Post()
    addline(@Body() line: Line) {
        return this.lineService.create(line);
    }

    @Patch(':id')
    updateline(
        @Param('id') id: number,
        @Body() lineData: Partial<Line>,
    ) {
        return this.lineService.update(id, lineData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteline(@Param('id') id: number) {
        // await this.lineService.delete(id)
    }

    //NA ASSIGN TREBA DA ZAPAMTIM KO JE ASSIGNOVAO
}
