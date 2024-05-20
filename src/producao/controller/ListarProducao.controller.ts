import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Producao } from '../entities/producao.entity';
import { ListarProducaoUseCase } from '../usecases/listarproducao.usecase';
import { Request } from 'express';

@ApiTags('producao')
@Controller()
class ListarProducaoController {
  constructor(private readonly listarProducaoUseCase: ListarProducaoUseCase) {}

  @ApiParam({
    name: 'numeroPedido',
    schema: {
      properties: {
        numeroPedido: {
          type: 'number',
        },
      },
    },
  })
  @Get(':numeroPedido')
  async handle(@Req() request: Request): Promise<Producao> {
    const numeroPedido = request.params.numeroPedido;
    return await this.listarProducaoUseCase.execute(Number.parseInt(numeroPedido));
  }
}

export { ListarProducaoController };
