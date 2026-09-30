import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ContractService } from './contract.service.js';
import { CreateContractDto } from './dto/create_contract.dto.js';
import { UpdateContractDto } from './dto/update_contract.dto.js';

@Controller('contracts')
export class ContractController {
  constructor(private readonly ContractService: ContractService) {}

  @Post()
  async create(@Body() dto: CreateContractDto) {
    return this.ContractService.create(dto);
  }

  @Get(':customerNumber')
  async findByCustomerNumber(@Param('customerNumber') customerNumber: string) {
    return this.ContractService.findByCustomerNumber(customerNumber);
  }

  @Patch(':contractNumber')
  async update(
    @Param('contractNumber') contractNumber: string,
    @Body() dto: UpdateContractDto,
  ) {
    return this.ContractService.update(contractNumber, dto);
  }

  @Delete(':contractNumber')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('contractNumber') contractNumber: string) {
    return this.ContractService.remove(contractNumber);
  }
}
