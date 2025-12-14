import { Line } from 'src/line/entities/line.entity';
import { Segment } from 'src/segment/entities/segment.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn({ name: 'teamId', type: 'int' })
  id: number;

  @Column({ name: 'teamName', type: 'nvarchar', length: 255 })
  teamName: string;

  @Column({ name: 'description', type: 'nvarchar', nullable: true })
  description: string;

  @Column({ name: 'teamLeader', type: 'nvarchar', length: 255 })
  teamLeader: string;

  @Column({ name: 'teamLeaderId', type: 'int', nullable: true })
  teamLeaderId: number | null;

  @Column({ name: 'segmentId', type: 'int' })
  segmentId: number;

  @Column({ name: 'segmentName', type: 'nvarchar', length: 255 })
  segmentName: string;

  @Column({ name: 'createDate', type: 'datetime' })
  createDate: Date;

  @OneToMany(() => User, user => user.team)
  users: User[];

  @OneToMany(() => Line, line => line.team)
  lines: Line[];

  @ManyToOne(() => Segment, segment => segment.teams)
  segment: Segment;
}
