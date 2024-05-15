import { Controller, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlterarStatusProducaoUseCase } from '../usecases/alterarStatusProducao.usecase';
import { Request, Response } from 'express';

@ApiTags('producao')
@Controller()
class AlterarStatusProducaoController {
  constructor(
    private readonly alterarStatusProducaoUseCase: AlterarStatusProducaoUseCase,
  ) {}

  @Put()
  async handle(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const id = request.params.id;
    const { status } = request.body;

    await this.alterarStatusProducaoUseCase.execute(id, status);
    return response.send(200);
  }
}

export { AlterarStatusProducaoController };
