import { Injectable } from '@nestjs/common';
import { ProducaoDTO } from 'src/producao/dtos/producao.dto';
import { Producao } from 'src/producao/entities/producao.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
class ProducaoRepository {
  private producoes: Producao[] = [];

  async save({ numeroPedido, id, status }: ProducaoDTO) {
    this.producoes.push({
      numeroPedido,
      id: !id ? uuidv4() : id,
      status: !status ? 'Em andamento' : status,
    });
  }

  async find() {
    return this.producoes;
  }

  async findOne(id: string) {
    return this.producoes.find(() => id);
  }
}

export { ProducaoRepository };
