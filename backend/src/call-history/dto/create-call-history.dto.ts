import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { CallDirection } from '../types/call-history.types';

export class CreateCallHistoryDto {
  @IsOptional()
  @IsInt()
  customerId?: number;

  @IsEnum(CallDirection)
  direction!: CallDirection;

  @IsString()
  fromNumber!: string;

  @IsString()
  toNumber!: string;

  @IsOptional()
  @IsString()
  callNotes?: string;

  @IsDateString()
  startedAt!: string;

  @IsDateString()
  endedAt!: string;

  @IsOptional()
  @IsInt()
  duration?: number;
}
