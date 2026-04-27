import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Line } from 'src/line/entities/line.entity';
import { Team } from 'src/team/entities/team.entity';

@Entity('hourly')
export class Hourly {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'teamId', type: 'int', nullable: false })
  teamId: number;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({ name: 'lineId', type: 'int', nullable: false })
  lineId: number;

  @ManyToOne(() => Line)
  @JoinColumn({ name: 'lineId' })
  line: Line;

  @Column({ name: 'insertedDate', type: 'datetime', default: null })
  insertedDate: Date;

  @Column({ type: 'int' })
  shiftPatternId: number;

  @Column({ type: 'nvarchar', length: 255 })
  insertedBy: string;

  @Column({ type: 'int' })
  plannedEmployeesNo: number;

  @Column({ type: 'int' })
  employeesNo: number;

  @Column({ type: 'int' })
  workingMinutes: number;

  @Column({ type: 'nvarchar', length: 255 })
  productName: string;

  @Column({ type: 'int' })
  producedProductNo: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  plannedProductNo: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  efficiencyE1: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  absentism: number;

  @Column({ type: 'nvarchar', nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'datetime', name: 'inputDate' })
  inputDate: Date;

}