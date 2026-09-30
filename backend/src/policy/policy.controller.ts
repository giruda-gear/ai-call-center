import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';

import { PolicyService } from './policy.service.js';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('/:id/ingest')
  async ingest(@Param('id', ParseIntPipe) id: number) {
    return this.policyService.ingestPolicy(id);
  }
}
