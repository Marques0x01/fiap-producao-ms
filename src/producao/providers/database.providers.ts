import { DataSource } from 'typeorm';
import { Producao } from '../entities/producao.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'fiap-producao-ms.cfooekoy8k6i.us-east-1.rds.amazonaws.com',
        port: 5432,
        username: 'postgres',
        password: 'hashicorp',
        database: 'postgres',
        entities: [Producao],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
