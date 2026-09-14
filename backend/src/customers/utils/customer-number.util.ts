import { randomBytes } from 'crypto';

export function generateCustomerNumber() {
  return `C-${randomBytes(4).toString('hex').toUpperCase()}`;
}
