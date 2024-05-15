import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProducaoUseCase } from '../usecases/createProducao.usecase';
import { ProducaoDTO } from '../dtos/producao.dto';
import { Response } from 'express';

@ApiTags('producao')
@Controller()
class CreateProducaoController {
  constructor(private readonly createProducaoUseCase: CreateProducaoUseCase) {}

  @Post()
  async handle(
    @Body() producao: ProducaoDTO,
    @Res() response?: Response,
  ): Promise<Response> {
    await this.createProducaoUseCase.execute(producao);
    return response.send(201);
  }
}

export { CreateProducaoController };
