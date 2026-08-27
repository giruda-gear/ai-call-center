import { DrizzleDB } from '../db/drizzle.module';
import { CustomersService } from './customers.service';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomersService;
  let db: DrizzleDB;

  beforeEach(() => {
    db = {
      select: jest.fn(),
    } as unknown as DrizzleDB; // update,remove..: unknown

    service = new CustomersService(db);
  });

  describe('findById', () => {
    it('should throw NotFoundException when the customer does not exist', async () => {
      // arrange
      const where = jest.fn().mockResolvedValue([]);
      const from = jest.fn().mockReturnValue({ where });

      (db.select as jest.Mock).mockReturnValue({
        from,
      });
      // act + assert
      await expect(service.findById(0)).rejects.toThrow(NotFoundException);
    });
  });
});
