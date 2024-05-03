import { Controller, Get } from '@nestjs/common';
import { ListarTodasProducoesUseCase } from '../usecases/listartodasproducoes.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('producao')
@Controller()
class ListarTodasProducoesController {
  constructor(
    private readonly listarTodasProducoesUseCase: ListarTodasProducoesUseCase,
  ) {}

  @Get()
  async handler() {
    return await this.listarTodasProducoesUseCase.execute();
  }
}

export { ListarTodasProducoesController };
