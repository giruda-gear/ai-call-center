import { Body, Controller, Post } from '@nestjs/common';

import { ChatDto } from '../ai/dto/chat.dto.js';
import { AssistantService } from './assistant.service.js';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('message')
  processMessage(@Body() dto: ChatDto) {
    return this.assistantService.processMessage(dto.message);
  }
}
