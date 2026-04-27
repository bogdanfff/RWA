import { BadRequestException } from '@nestjs/common';
import { Line } from '../../line/entities/line.entity';

export function validateHourlyDate(line: Line, currentDate: Date = new Date()) {
    if (!line.assignedShiftDate) return;

    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    const assignedDate = new Date(line.assignedShiftDate);
    assignedDate.setHours(0, 0, 0, 0);

    const diffInDays = (assignedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    if (
        diffInDays !== 0 &&
        !(line.assignedShift === 3 && diffInDays === -1)
    ) {
        throw new BadRequestException(
            `Inputed on a wrong date, assigned shift is ${assignedDate.getFullYear()}-${(assignedDate.getMonth() + 1)
                .toString().padStart(2, '0')}-${assignedDate.getDate().toString().padStart(2, '0')}`
        );
    }
}