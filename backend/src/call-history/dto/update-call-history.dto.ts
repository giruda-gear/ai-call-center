import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCallHistoryDto {
  @IsString()
  @IsNotEmpty()
  callNotes!: string;
}
