import { Body, Controller, Post } from '@nestjs/common';

import { AssistantService } from './assistant.service.js';
import { AssistantMessageDto } from './dto/assistant-message.dto.js';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('message')
  processMessage(@Body() dto: AssistantMessageDto) {
    return this.assistantService.processMessage(
      dto.message,
      dto.contractNumber,
    );
  }
}
