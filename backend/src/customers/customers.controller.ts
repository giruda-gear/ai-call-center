import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const customer = this.customerService.create(dto);
    return customer;
  }

  @Get()
  async findAll(@Query('q') query?: string) {
    return this.customerService.findAll(query);
  }

  @Get(':customerNumber')
  async findByCustomerNumber(@Param('customerNumber') customerNumber: string) {
    return this.customerService.findByCustomerNumber(customerNumber);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }
}
