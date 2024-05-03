import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../entities/producao.entity';
import { Repository } from 'typeorm';

@Injectable()
class ListarTodasProducoesUseCase {
    constructor(
        @Inject('PRODUCAO_REPOSITORY') private producaoRepository: Repository<Producao>,
      ) {}

      async execute() {
        return await this.producaoRepository.find();
      }
}

export { ListarTodasProducoesUseCase }