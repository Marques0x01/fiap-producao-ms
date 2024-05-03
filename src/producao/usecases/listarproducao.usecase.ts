import { Inject, Injectable } from '@nestjs/common';
import { Producao } from '../entities/producao.entity';
import { Repository } from 'typeorm';

@Injectable()
class ListarProducaoUseCase {
  constructor(
    @Inject('PRODUCAO_REPOSITORY') private producaoRepository: Repository<Producao>,
  ) {}

  async execute(id: string) {
    return await this.producaoRepository.findOne({
      where: { id: id },
    });
  }
}

export { ListarProducaoUseCase };
