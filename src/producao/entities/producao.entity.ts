import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('producao')
class Producao {
  @PrimaryColumn({
    generated: "uuid",
  })
  id?: string | null;

  @Column()
  numeroPedido: number;

  @Column()
  status: string;
}

export { Producao };
