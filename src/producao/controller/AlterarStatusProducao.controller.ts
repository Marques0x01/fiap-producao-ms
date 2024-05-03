import { Controller, Put } from '@nestjs/common';
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
  async handle(request: Request, response: Response): Promise<void> {
    const id = request.params.id;
    const { status } = request.body;

    await this.alterarStatusProducaoUseCase.execute(id, status);
  }
}

export { AlterarStatusProducaoController };
