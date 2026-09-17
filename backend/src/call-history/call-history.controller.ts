import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CallHistoryService } from './call-history.service';
import { CreateCallHistoryDto } from './dto/create-call-history.dto';
import { FindCallHistoryDto } from './dto/find-call-history.dto';

@Controller('call-history')
export class CallHistoryController {
  constructor(private readonly callHistoryService: CallHistoryService) {}

  @Post()
  create(@Body() createCallHistoryDto: CreateCallHistoryDto) {
    return this.callHistoryService.create(createCallHistoryDto);
  }

  @Get()
  findAll(@Query() query: FindCallHistoryDto) {
    return this.callHistoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.callHistoryService.findOne(id);
  }
}
