import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePreferencesDTO, UpdatePreferencesDTO } from './DTOs';

@Injectable()
export class PreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async createPreferences(createPreferencesDTO: CreatePreferencesDTO) {
    return this.prisma.preferenciasDeNotificacao.create({
      data: {
        UserID: createPreferencesDTO.userId,
        ReceberEmails: createPreferencesDTO.receberEmails,
      },
    });
  }

  async getPreferences(id: number) {
    const existingPreferences =
      await this.prisma.preferenciasDeNotificacao.findUnique({
        where: {
          PreferenciasID: Number(id),
        },
      });
    if (!existingPreferences) {
      throw new NotFoundException('Preferências não encontradas');
    }
    return existingPreferences;
  }

  async deletePreferences(id: number) {
    const existingPreferences =
      await this.prisma.preferenciasDeNotificacao.findUnique({
        where: {
          PreferenciasID: Number(id),
        },
      });
    if (!existingPreferences) {
      throw new NotFoundException('Preferências não encontradas');
    }
    return this.prisma.preferenciasDeNotificacao.delete({
      where: { PreferenciasID: Number(id) },
    });
  }

  async updatePreferences(updatePreferencesDTO: UpdatePreferencesDTO) {
    const existingPreferences =
      await this.prisma.preferenciasDeNotificacao.findUnique({
        where: {
          PreferenciasID: Number(updatePreferencesDTO.preferencesId),
        },
      });
    if (!existingPreferences) {
      throw new NotFoundException('Preferências não encontradas');
    }
    return this.prisma.preferenciasDeNotificacao.update({
      where: { PreferenciasID: Number(updatePreferencesDTO.preferencesId) },
      data: {
        ReceberEmails: updatePreferencesDTO.receberEmails,
      },
    });
  }
}
