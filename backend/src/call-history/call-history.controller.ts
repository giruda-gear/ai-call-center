import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';
import { CallHistoryService } from './call-history.service';
import { CreateCallHistoryDto } from './dto/create-call-history.dto';
import { FindCallHistoryDto } from './dto/find-call-history.dto';
import { UpdateCallHistoryDto } from './dto/update-call-history.dto';

@Controller('call-histories')
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCallHistoryDto) {
    return this.callHistoryService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  findOne(@Param('id') id: number) {
    return this.callHistoryService.remove(id);
  }
}
