import { Injectable } from '@nestjs/common';

import { AiService } from '../ai/ai.service.js';
import { ContractService } from '../contracts/contract.service.js';
import { PolicyService } from '../policy/policy.service.js';

@Injectable()
export class AssistantService {
  constructor(
    private readonly aiService: AiService,
    private readonly policyService: PolicyService,
    private readonly contractService: ContractService,
  ) {}

  async processMessage(message: string, contractNumber: string) {
    const analysis = await this.aiService.analyze(message);

    if (!analysis.needsPolicySearch) {
      return this.aiService.chat(message);
    }

    const contract =
      await this.contractService.findByContractNumber(contractNumber);

    if (!contract) {
      return 'I could not find the contract. Please verify the contract number.';
    }

    const chunks = await this.policyService.searchPolicyChunks(
      message,
      contract.type,
    );

    if (chunks.length === 0) {
      return 'The available policy information is insufficient to answer this question.';
    }

    const context = chunks
      .map((chunk) =>
        `
      Policy: ${chunk.policyTitle}
      Type: ${chunk.policyType}

      ${chunk.content}x
      `.trim(),
      )
      .join('\n\n');

    return this.aiService.generateAnswer(message, context);
  }
}
