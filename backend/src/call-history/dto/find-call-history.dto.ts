import { IsOptional, IsString, Matches } from 'class-validator';

export class FindCallHistoryDto {
  @IsOptional()
  @IsString()
  customerNumber?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  from?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  to?: string;
}
