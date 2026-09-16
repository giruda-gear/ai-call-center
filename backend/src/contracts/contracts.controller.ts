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
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create_contract.dto';
import { UpdateContractDto } from './dto/update_contract.dto';

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

  @Patch(':contractNumber')
  async update(
    @Param('contractNumber') contractNumber: string,
    @Body() dto: UpdateContractDto,
  ) {
    return this.contractsService.update(contractNumber, dto);
  }

  @Delete(':contractNumber')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('contractNumber') contractNumber: string) {
    return this.contractsService.remove(contractNumber);
  }
}
