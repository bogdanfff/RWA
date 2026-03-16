import { Segment } from 'src/segment/entities/segment.entity';
import { Team } from 'src/team/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'userId', type: 'int' })
  id: number;

  @Column({ name: 'userName', type: 'nvarchar', length: 255 })
  userName: string;

  @Column({ name: 'firstName', type: 'nvarchar', length: 255 })
  firstName: string;

  @Column({ name: 'lastName', type: 'nvarchar', length: 255 })
  lastName: string;

  @Column({ name: 'password', type: 'nvarchar', length: 255, nullable: true })
  password: string | null;

  @Column({ name: 'email', type: 'nvarchar', length: 255 })
  email: string;

  @Column({ name: 'phoneNumber', type: 'nvarchar', length: 50 })
  phoneNumber: string;

  @Column({ name: 'roleID', type: 'int', nullable: true })
  roleId: number | null;

  @Column({ name: 'roleName', type: 'nvarchar', length: 255 })
  roleName: string;

  @Column({ name: 'active', type: 'bit' })
  active: boolean;

  @Column({ name: 'createDate', type: 'datetime', default: () => 'GETDATE()' })
  createDate: Date;

  @Column({ name: 'refreshToken', type: 'nvarchar', length: 255, nullable: true })
  refreshToken: string | null;

  @Column({ name: 'teamId', type: 'int', nullable: true })
  teamId: number;

  @ManyToOne(() => Team, team => team.users, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  team: Team | null;

  @OneToMany(() => Team, team => team.teamLeader)
  teamsLeader: Team[];

  @OneToMany(() => Segment, segment => segment.segmentLeader)
  segmentLeader: Segment[];
}

