import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Producao } from '../entities/producao.entity';
import { CreateProducaoUseCase } from '../usecases/createProducao.usecase';
import { Request, Response } from 'express';

@ApiTags('producao')
@Controller()
class InicarProducaoController {
  constructor(private readonly createProducaoUseCase: CreateProducaoUseCase) {}

  @Post()
  async handle(@Body() producao: Producao): Promise<void> {
    await this.createProducaoUseCase.execute(producao);
  }
}

export { InicarProducaoController };
