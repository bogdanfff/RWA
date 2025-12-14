import { Controller, Get } from '@nestjs/common';
import { LineService } from './line.service';

@Controller('line')
export class LineController {
    constructor(private readonly lineService: LineService) { }
    @Get()
    getAllLines() {
        return this.lineService.findAll()
    }
}
