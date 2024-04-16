import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    PedidosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
