import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AiModule } from './ai/ai.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CallHistoryModule } from './call-history/call-history.module.js';
import { ContractsModule } from './contracts/contracts.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { DrizzleModule } from './db/drizzle.module.js';
import { PolicyModule } from './policy/policy.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  ignore: 'pid,hostname,req,res,responseTime',
                  customColors: 'message:white',
                  useOnlyCustomProps: false,
                },
              },

        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 500 || err) return 'error';
          if (res.statusCode >= 400) return 'warn';
          return 'info';
        },

        customSuccessMessage: (req, res, responseTime) =>
          `${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`,

        customErrorMessage: (req, res) =>
          `${req.method} ${req.url} ${res.statusCode}`,

        customErrorObject: () => ({}),
      },
    }),
    DrizzleModule,
    CustomersModule,
    ContractsModule,
    CallHistoryModule,
    AiModule,
    PolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
