import { Line } from 'src/line/entities/line.entity';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('segments')
export class Segment {
  @PrimaryGeneratedColumn({ name: 'segmentId', type: 'int' })
  id: number;

  @Column({ name: 'segmentName', type: 'nvarchar', length: 255 })
  segmentName: string;

  @Column({ name: 'description', type: 'nvarchar' })
  description: string;

  @Column({ name: 'segmentLeaderId', type: 'int', nullable: true })
  segmentLeaderId: number | null;

  @ManyToOne(() => User, user => user.segmentLeader, { nullable: true })
  @JoinColumn({ name: 'segmentLeaderId' })
  segmentLeader: User | null;

  @Column({ name: 'createDate', type: 'datetime', default: () => 'GETDATE()' })
  createDate: Date;

  @OneToMany(() => Team, team => team.segment)
  teams: Team[];

  @OneToMany(() => Line, line => line.segmentName)
  lines: Line[];
}
