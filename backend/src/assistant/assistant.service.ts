import { Injectable } from '@nestjs/common';

import { AiService } from '../ai/ai.service.js';
import { PolicyService } from '../policy/policy.service.js';

@Injectable()
export class AssistantService {
  constructor(
    private readonly aiService: AiService,
    private readonly policyService: PolicyService,
  ) {}

  async processMessage(message: string) {
    const analysis = await this.aiService.analyze(message);

    if (analysis.needsPolicySearch) {
      const chunks = await this.policyService.searchPolicyChunks(message);

      const context = chunks.map((chunk) => chunk.content).join('\n\n');

      return this.aiService.generateAnswer(message, context);
    }

    return this.aiService.chat(message);
  }
}
