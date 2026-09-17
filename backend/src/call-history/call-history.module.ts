import { Module } from '@nestjs/common';
import { CallHistoryService } from './call-history.service';
import { CallHistoryController } from './call-history.controller';

@Module({
  controllers: [CallHistoryController],
  providers: [CallHistoryService],
})
export class CallHistoryModule {}
