import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('segments')
export class Segment {
  @PrimaryGeneratedColumn({ name: 'segmentId', type: 'int' })
  id: number;

  @Column({ name: 'segmentName', type: 'nvarchar', length: 255 })
  segmentName: string;

  @Column({ name: 'description', type: 'nvarchar' })
  description: string;

  @Column({ name: 'segmentLeader', type: 'nvarchar', length: 255 })
  segmentLeader: string;

  @Column({ name: 'segmentLeaderId', type: 'int', nullable: true })
  segmentLeaderId: number | null;

  @Column({ name: 'createDate', type: 'datetime' })
  createDate: Date;

  @OneToMany(() => Team, team => team.segment)
  teams: Team[];
}
