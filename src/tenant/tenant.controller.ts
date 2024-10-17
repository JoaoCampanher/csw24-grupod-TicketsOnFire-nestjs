import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTenantDTO } from './DTOs';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDTO: CreateTenantDTO) {
    return this.tenantService.createTenant(createTenantDTO);
  }

  @Delete(':id')
  async deleteTenant(@Param('id') id: number) {
    return this.tenantService.deleteTenant(id);
  }

  @Get(':id')
  async getTenant(@Param('id') id: number) {
    return this.tenantService.getTenant(id);
  }
}
