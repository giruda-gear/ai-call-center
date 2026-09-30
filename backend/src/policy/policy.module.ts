import { Module } from '@nestjs/common';

import { AiModule } from '../ai/ai.module.js';
import { PolicyController } from './policy.controller.js';
import { PolicyService } from './policy.service.js';

@Module({
  imports: [AiModule],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
