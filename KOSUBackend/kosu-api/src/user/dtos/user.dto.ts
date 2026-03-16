import { IsString, IsNotEmpty, IsEmail, IsInt, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  @IsOptional()
  roleId?: number;

  @IsString()
  roleName: string;

  @IsInt()
  @IsOptional()
  teamId?: number; // povezuje usera sa timom
}
export interface UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  roleId: number | null;
  roleName: string
  teamName: string | undefined;

  active: boolean;
  createDate: Date;
}

export function mapUserToDto(user: User): UserDto {
  return {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,

    roleId: user.roleId,
    roleName: user.roleName,
    teamName: user.team?.teamName,

    active: user.active,
    createDate: user.createDate,
  }
}