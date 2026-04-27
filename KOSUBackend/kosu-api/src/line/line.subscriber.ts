// src/line/line.subscriber.ts
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Hourly } from 'src/hourly/entities/hourly.entity';
import { Line } from './entities/line.entity';

@EventSubscriber()
export class LineSubscriber implements EntitySubscriberInterface<Line> {
    /**
     * Subscribe to Line entity
     */
    listenTo() {
        return Line;
    }

    /**
     * Trigger after Line update
     */
    async afterUpdate(event: UpdateEvent<Line>) {
        const updatedLine = event.entity;
        if (!updatedLine) return;
        if (event.updatedColumns.some(col => col.propertyName === 'assignedTarget')) {
            const hourlyRepository = event.manager.getRepository(Hourly);
            const hourlies = await hourlyRepository.find({ where: { lineId: updatedLine.id } });

            for (const h of hourlies) {
                h.plannedProductNo = (updatedLine.assignedTarget ?? 0) / 8;
            }
            
            if (hourlies.length > 0) {
                await hourlyRepository.save(hourlies);
            }
        }
    }
}