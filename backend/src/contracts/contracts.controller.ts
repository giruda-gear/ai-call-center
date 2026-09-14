import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create_contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(@Body() dto: CreateContractDto) {
    return this.contractsService.create(dto);
  }

  @Get(':customerNumber')
  async findByCustomerNumber(@Param('customerNumber') customerNumber: string) {
    return this.contractsService.findByCustomerNumber(customerNumber);
  }
}
