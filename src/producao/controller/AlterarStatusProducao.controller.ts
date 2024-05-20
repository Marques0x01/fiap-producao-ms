import { Controller, Put, Req, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AlterarStatusProducaoUseCase } from '../usecases/alterarStatusProducao.usecase';
import { Request, Response } from 'express';

@ApiTags('producao')
@Controller()
class AlterarStatusProducaoController {
  constructor(
    private readonly alterarStatusProducaoUseCase: AlterarStatusProducaoUseCase,
  ) {}

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
  @ApiBody({
    schema: {
      properties: {
        status: {
          type: 'string',
        }
      }
    }
  })
  @Put(':numeroPedido')
  async handle(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const numeroPedido = request.params.numeroPedido;
    const { status } = request.body;

    await this.alterarStatusProducaoUseCase.execute(
      Number(numeroPedido),
      status,
    );
    return response.send(200);
  }
}

export { AlterarStatusProducaoController };
