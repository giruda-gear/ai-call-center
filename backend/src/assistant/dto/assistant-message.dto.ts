import { IsNotEmpty, IsString } from 'class-validator';

export class AssistantMessageDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  contractNumber!: string;
}
