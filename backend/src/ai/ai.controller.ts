import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  chat(@Body() dto: ChatDto) {
    return this.aiService.chat(dto.message);
  }

  @Post('analyze')
  analyze(@Body() dto: ChatDto) {
    return this.aiService.analyze(dto.message);
  }

  @Post('embed')
  async embed(@Body() dto: ChatDto) {
    const embedding = await this.aiService.embed(dto.message);

    return { dimensions: embedding.length, embedding };
  }
}
