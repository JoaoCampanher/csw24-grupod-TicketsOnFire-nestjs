import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SampleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSample(name: string) {
    return await this.prisma.sample.create({
      data: {
        Nome: name,
      },
    });
  }

  async updateSample(obj: { id: string; nome: string }) {
    return await this.prisma.sample.update({
      where: { SampleID: obj.id },
      data: { Nome: obj.nome },
    });
  }

  async deleteSample(id: string) {
    return await this.prisma.sample.delete({
      where: { SampleID: id },
    });
  }

  async getSample(id: string) {
    return await this.prisma.sample.findUnique({
      where: { SampleID: id },
    });
  }
}
