import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../entities/producao.entity';
import { Repository } from 'typeorm';

@Injectable()
class CreateProducaoUseCase {
    constructor(
        @Inject('PRODUCAO_REPOSITORY') private producaoRepository: Repository<Producao>,
      ) {}

      async execute(producao: Producao) {
        await this.producaoRepository.save(producao);    
      }
}

export { CreateProducaoUseCase }