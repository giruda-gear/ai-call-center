import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { DrizzleModule } from '../db/drizzle.module';
import { ConfigModule } from '@nestjs/config';

describe('Customer Service Integration', () => {
  let service: CustomersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DrizzleModule],
      providers: [CustomersService],
    }).compile();

    service = module.get(CustomersService);
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
