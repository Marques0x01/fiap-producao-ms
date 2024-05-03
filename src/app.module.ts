import { Module } from '@nestjs/common';
import { ProducaoModule } from './producao/producao.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ProducaoModule,
    RouterModule.register([
      {
        path: 'producoes',
        module: ProducaoModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
