import { Injectable, NotFoundException } from '@nestjs/common';

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
    const contract =
      await this.contractService.findByContractNumber(contractNumber);
    
      if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    const analysis = await this.aiService.analyze(message);

    if (analysis.needsPolicySearch) {
      const chunks = await this.policyService.searchPolicyChunks(
        message,
        contract.type,
      );

      if (chunks.length === 0) {
        return {
          answer:
            'The available policy information is insufficient to answer this question.',
          sources: [],
        };
      }

      const context = chunks
        .map((chunk) =>
          `
      Policy: ${chunk.policyTitle}
      Type: ${chunk.policyType}

      ${chunk.content}
      `.trim(),
        )
        .join('\n\n');

      const answer = await this.aiService.generateAnswer(message, context);

      return {
        answer,
        sources: chunks.map((chunk) => ({
          policyId: chunk.policyId,
          title: chunk.policyTitle,
          type: chunk.policyType,
        })),
      };
    }

    const answer = await this.aiService.chat(message);

    return {
      answer,
      sources: [],
    };
  }
}
