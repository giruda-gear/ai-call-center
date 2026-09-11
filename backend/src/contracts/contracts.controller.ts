import { Controller, Get, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get(':customerId')
  async findByCustomerId(@Param('customerId') customerId: number) {
    return this.contractsService.findByCustomerId(customerId);
  }
}
