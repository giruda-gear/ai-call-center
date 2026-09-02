import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './db/drizzle.module';
import { LoggerModule } from 'nestjs-pino';

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
                  translateTime: 'SYS:HH:MM:ss',
                  ignore: 'pid,hostname,req,res,responseTime',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
