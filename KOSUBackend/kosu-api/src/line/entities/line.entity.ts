import { Segment } from 'src/segment/entities/segment.entity';
import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';

@Entity('lines')
export class Line {
  @PrimaryGeneratedColumn({ name: 'lineId', type: 'int' })
  id: number;

  @Column({ name: 'lineName', type: 'nvarchar', length: 255 })
  lineName: string;

  @Column({ name: 'description', type: 'nvarchar', nullable: true })
  description: string;

  @Column({ name: 'assignedShift', type: 'int', nullable: true })
  assignedShift: number | null;

  @Column({ name: 'assignedShiftDate', type: 'datetime', nullable: true })
  assignedShiftDate: Date | null;

  @Column({ name: 'assignedTarget', type: 'int', nullable: true })
  assignedTarget: number | null;

  @Column({ name: 'assignedByUser', type: 'nvarchar', length: 255, nullable: true })
  assignedByUser: string | null;

  @Column({ name: 'assignedEmployeesNo', type: 'int', nullable: true })
  assignedEmployeesNo: number | null;

  @Column({ name: 'segmentNameId', type: 'int', nullable: false })
  segmentNameId: number;

  @ManyToOne(() => Segment, segment => segment.lines, { nullable: false })
  @JoinColumn({ name: 'segmentNameId' })
  segmentName: Segment;

  @UpdateDateColumn({ name: 'updateDate', type: 'datetime' })
  updateDate: Date;

  @Column({ name: 'assignedTeamId', type: 'int', nullable: true })
  assignedTeamId: number;

  @ManyToOne(() => Team, team => team.lines, { nullable: true })
  @JoinColumn({ name: 'assignedTeamId' })
  assignedTeam: Team | null;
}
