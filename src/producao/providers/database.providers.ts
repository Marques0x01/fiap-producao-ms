import { DataSource } from 'typeorm';
import { Producao } from '../entities/producao.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost.localstack.cloud',
        port: 4510,
        username: 'edu',
        password: 'hashicorp',
        database: 'postgres',
        entities: [Producao],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
