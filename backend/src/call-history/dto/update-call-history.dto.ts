import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateCallHistoryDto {
  @IsString()
  @IsOptional()
  customerRequestSummary?: string;

  @IsString()
  @IsOptional()
  actionTaken?: string;

  @IsIn(['RESOLVED', 'FOLLOW_UP', 'ESCALATED'])
  @IsOptional()
  disposition?: 'RESOLVED' | 'FOLLOW_UP' | 'ESCALATED';

  @IsString()
  @IsOptional()
  callNotes?: string;

  @IsOptional()
  @IsDateString()
  endedAt?: string;
}
