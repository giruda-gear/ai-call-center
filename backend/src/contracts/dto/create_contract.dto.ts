import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { ContractStatus, ContractType } from '../types/contract.types';

export class CreateContractDto {
  @IsInt()
  customerId!: number;

  @IsEnum(ContractType)
  type!: ContractType;

  @IsEnum(ContractStatus)
  status!: ContractStatus;

  @IsDateString()
  startDate?: string;

  @IsDateString()
  endDate?: string;
}
