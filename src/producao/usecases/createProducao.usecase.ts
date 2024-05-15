import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../entities/producao.entity';
import { Repository } from 'typeorm';
import { ProducaoDTO } from '../dtos/producao.dto';

@Injectable()
class CreateProducaoUseCase {
  constructor(
    @Inject('PRODUCAO_REPOSITORY')
    private producaoRepository: Repository<Producao>,
  ) {}

  async execute(producao: ProducaoDTO) {
    producao.status = 'Em andamento';
    await this.producaoRepository.save(producao);
  }
}

export { CreateProducaoUseCase };
