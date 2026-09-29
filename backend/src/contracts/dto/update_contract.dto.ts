import { PartialType } from '@nestjs/swagger';

import { CreateContractDto } from './create_contract.dto.js';

export class UpdateContractDto extends PartialType(CreateContractDto) {}
