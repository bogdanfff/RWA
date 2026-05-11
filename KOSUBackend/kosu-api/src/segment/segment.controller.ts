import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { Segment } from './entities/segment.entity';
import { SegmentDto } from './dtos/segment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('Segments')
export class SegmentController {
    constructor(private readonly segmentsService: SegmentService) { }
    @Get()
    getAllSegments() {
        return this.segmentsService.findAll()
    }

    @Post()
    addSegment(@Body() segment: Segment) {
        return this.segmentsService.create(segment);
    }

    @Patch(':id')
    updateSegment(
        @Param('id') id: number,
        @Body() segmentData: Partial<Segment>,
    ): Promise<SegmentDto | null> {
        return this.segmentsService.update(id, segmentData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteSegment(@Param('id') id: number) {
        await this.segmentsService.deleteSegment(id)
    }
}
