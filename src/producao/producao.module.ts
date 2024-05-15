import { Module } from '@nestjs/common';
import { AlterarStatusProducaoController } from './controller/AlterarStatusProducao.controller';
import { CreateProducaoController } from './controller/CreateProducao.controller';
import { ListarProducaoController } from './controller/ListarProducao.controller';
import { ListarTodasProducoesController } from './controller/ListarTodasProducoes.controller';
import { ListarProducaoUseCase } from './usecases/listarproducao.usecase';
import { ListarTodasProducoesUseCase } from './usecases/listartodasproducoes.usecase';
import { CreateProducaoUseCase } from './usecases/createProducao.usecase';
import { AlterarStatusProducaoUseCase } from './usecases/alterarStatusProducao.usecase';
import { DatabaseModule } from 'src/Config/datasource/database.module';
import { producaoProviders } from './providers/producao.providers';

@Module({
  imports: [
	DatabaseModule,
  ],
  controllers: [
    AlterarStatusProducaoController,
    CreateProducaoController,
    ListarProducaoController,
    ListarTodasProducoesController,
  ],
  providers: [
	...producaoProviders,
    AlterarStatusProducaoUseCase,
    ListarProducaoUseCase,
    ListarTodasProducoesUseCase,
    CreateProducaoUseCase,
  ],
})
export class ProducaoModule {}
