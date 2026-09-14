import { randomBytes } from 'crypto';
import { ContractType } from '../types/contract.types';

const CONTRACT_PREFIX: Record<ContractType, string> = {
  HEALTH: 'HE',
  LIFE: 'LI',
  AUTO: 'AU',
};

export function generateContractNumber(type: ContractType) {
  const prefix = CONTRACT_PREFIX[type];
  const random = randomBytes(4).toString('hex').toUpperCase();

  return `${prefix}-${random}`;
}
