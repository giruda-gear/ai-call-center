import { Module } from '@nestjs/common';

import { CallHistoryController } from './call-history.controller.js';
import { CallHistoryService } from './call-history.service.js';

@Module({
  controllers: [CallHistoryController],
  providers: [CallHistoryService],
})
export class CallHistoryModule {}
