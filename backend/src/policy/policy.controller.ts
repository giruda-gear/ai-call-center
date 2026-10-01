import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { PolicyService } from './policy.service.js';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('/:id/ingest')
  ingest(@Param('id', ParseIntPipe) id: number) {
    return this.policyService.ingestPolicy(id);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.policyService.searchPolicyChunks(query);
  }
}
