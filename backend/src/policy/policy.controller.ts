import { Controller } from '@nestjs/common';

import { PolicyService } from './policy.service.js';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}
}
