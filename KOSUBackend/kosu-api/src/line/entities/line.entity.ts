import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('lines')
export class Line {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
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

  @Column({ name: 'assignedTeam', type: 'nvarchar', length: 255, nullable: true })
  assignedTeam: string | null;

  @Column({ name: 'segmentName', type: 'nvarchar', length: 255 })
  segmentName: string;

  @Column({ name: 'updateDate', type: 'datetime' })
  updateDate: Date;

  @ManyToOne(() => Team, team => team.lines, { nullable: true })
  team: Team | null;
}
