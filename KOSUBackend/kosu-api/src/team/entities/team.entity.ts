import { Line } from 'src/line/entities/line.entity';
import { Segment } from 'src/segment/entities/segment.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn({ name: 'teamId', type: 'int' })
  id: number;

  @Column({ name: 'teamName', type: 'nvarchar', length: 255 })
  teamName: string;

  @Column({ name: 'description', type: 'nvarchar', nullable: true })
  description: string;

  @Column({ name: 'createDate', type: 'datetime', default: () => 'GETDATE()' })
  createDate: Date;

  @OneToMany(() => User, user => user.team)
  users: User[];

  @OneToMany(() => Line, line => line.assignedTeam)
  lines: Line[];

  @Column({ name: 'segmentId', type: 'int' })
  segmentId: number;

  @ManyToOne(() => Segment, segment => segment.teams)
  @JoinColumn({ name: 'segmentId' })
  segment: Segment;

  @Column({ name: 'teamLeaderId', type: 'int' })
  teamLeaderId: number;

  @ManyToOne(() => User, user => user.teamsLeader, { nullable: true })
  @JoinColumn({ name: 'teamLeaderId' })
  teamLeader?: User;
}
