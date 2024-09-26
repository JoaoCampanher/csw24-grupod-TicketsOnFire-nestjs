import { Controller, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant() {
    this.tenantService.createTenant();
  }
}
