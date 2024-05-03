import { DataSource } from 'typeorm';
import { Producao } from '../entities/producao.entity';

export const producaoProviders = [
  {
    provide: 'PRODUCAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Producao),
    inject: ['DATA_SOURCE'],
  },
];
