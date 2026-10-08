import { Module } from '@nestjs/common';

import { AiModule } from '../ai/ai.module.js';
import { PolicyModule } from '../policy/policy.module.js';
import { AssistantController } from './assistant.controller.js';
import { AssistantService } from './assistant.service.js';
import { ContractModule } from '../contracts/contract.module.js';

@Module({
  imports: [AiModule, PolicyModule, ContractModule],
  controllers: [AssistantController],
  providers: [AssistantService],
})
export class AssistantModule {}
