import { Controller, Put, Req, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AlterarStatusProducaoUseCase } from '../usecases/alterarStatusProducao.usecase';
import { Request, Response } from 'express';

@ApiTags('producao')
@Controller()
class AlterarStatusProducaoController {
  constructor(
    private readonly alterarStatusProducaoUseCase: AlterarStatusProducaoUseCase,
  ) {}

  @ApiParam({
    name: '',
    schema: {
      properties: {
        numeroPedido: {
          type: 'number',
        },
        status: {
          type: 'string',
        },
      },
    },
  })
  @Put()
  async handle(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const numeroPedido = request.params.numeroPedido;
    const { status } = request.body;

    await this.alterarStatusProducaoUseCase.execute(
      Number.parseInt(numeroPedido),
      status,
    );
    return response.send(200);
  }
}

export { AlterarStatusProducaoController };
