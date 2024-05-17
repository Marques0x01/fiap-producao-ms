import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../entities/producao.entity';
import { Repository } from 'typeorm';
import { ListarProducaoUseCase } from './listarproducao.usecase';

@Injectable()
class AlterarStatusProducaoUseCase {
    constructor(
        @Inject('PRODUCAO_REPOSITORY') private producaoRepository: Repository<Producao>,
        private listarProducaoUseCase: ListarProducaoUseCase
      ) {}

      async execute(numeroPedido: number, status) {
        const producao = await this.listarProducaoUseCase.execute(numeroPedido);
        producao.status = status;
        this.producaoRepository.save(producao);
      }
}

export { AlterarStatusProducaoUseCase };