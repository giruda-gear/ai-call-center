import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE_DB');
export const PG_CLIENT = Symbol('PG_CLIENT');
export type DrizzleDB = PostgresJsDatabase<typeof schema>;

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const connectionString = config.getOrThrow<string>('DATABASE_URL');
        return postgres(connectionString, { max: 10 });
      },
    },
    {
      provide: DRIZZLE,
      inject: [PG_CLIENT],
      useFactory: (client: postgres.Sql) =>
        drizzle(client, {
          schema,
          logger: process.env.NODE_ENV !== 'production',
        }) as DrizzleDB,
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule implements OnApplicationShutdown {
  constructor(@Inject(PG_CLIENT) private readonly client: postgres.Sql) {}

  async onApplicationShutdown() {
    await this.client.end();
  }
}
