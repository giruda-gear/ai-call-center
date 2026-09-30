import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DrizzleModule } from '../db/drizzle.module.js';
import { CustomerService } from './customer.service.js';

describe('Customer Service Integration', () => {
  let service: CustomerService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DrizzleModule],
      providers: [CustomerService],
    }).compile();

    service = module.get(CustomerService);
  });

  it('should create and retrieve a customer', async () => {
    const dto = {
      name: 'test1',
      email: `test-${Date.now()}@test.com`,
    };

    const created = await service.create(dto);
    expect(created.name).toBe(dto.name);
    expect(created.email).toBe(dto.email);

    const found = await service.findById(created.id);
    expect(found).toEqual(created);
  });

  afterAll(async () => {
    await module.close(); // this.client.end() postgres.js
  });
});
