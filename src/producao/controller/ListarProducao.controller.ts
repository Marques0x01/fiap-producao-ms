import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Producao } from '../entities/producao.entity';
import { ListarProducaoUseCase } from '../usecases/listarproducao.usecase';

@ApiTags('producao')
@Controller()
class ListarProducaoController {
  constructor(private readonly listarProducaoUseCase: ListarProducaoUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string): Promise<Producao> {
    return await this.listarProducaoUseCase.execute(id);
  }
}

export { ListarProducaoController };
