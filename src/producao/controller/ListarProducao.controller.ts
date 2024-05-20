import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Producao } from '../entities/producao.entity';
import { ListarProducaoUseCase } from '../usecases/listarproducao.usecase';

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
  async handle(@Param() params: any): Promise<Producao> {
    return await this.listarProducaoUseCase.execute(params.numeroPedido);
  }
}

export { ListarProducaoController };
