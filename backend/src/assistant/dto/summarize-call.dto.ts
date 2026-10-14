import { IsNotEmpty, IsString } from 'class-validator';

export class SummarizeCallDto {
  @IsString()
  @IsNotEmpty()
  transcript!: string;
}
