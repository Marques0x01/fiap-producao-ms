import { CreateProducaoController } from '../../src/producao/controller/CreateProducao.controller';
import { CreateProducaoUseCase } from '../../src/producao/usecases/createProducao.usecase';
import { ProducaoRepository } from '../repository/producacao.repository';
import { HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { ListarProducaoController } from '../../src/producao/controller/ListarProducao.controller';
import { AlterarStatusProducaoController } from '../../src/producao/controller/AlterarStatusProducao.controller';
import { ListarProducaoUseCase } from '../../src/producao/usecases/listarproducao.usecase';
import { AlterarStatusProducaoUseCase } from '../../src/producao/usecases/alterarStatusProducao.usecase';

describe('AlterarStatusProducaoController', () => {
  let producaoRepository;
  let createProducaoController: CreateProducaoController;
  let createProducaoUseCase: CreateProducaoUseCase;
  let listarProducaoController: ListarProducaoController;

  let listarProducaoUseCase: ListarProducaoUseCase;
  let alterarStatusProducaoUseCase: AlterarStatusProducaoUseCase;
  let alterarStatusProducaoController: AlterarStatusProducaoController;

  beforeEach(async () => {
    producaoRepository = new ProducaoRepository();
    createProducaoUseCase = new CreateProducaoUseCase(producaoRepository);
    listarProducaoUseCase = new ListarProducaoUseCase(producaoRepository);
    alterarStatusProducaoUseCase = new AlterarStatusProducaoUseCase(
      producaoRepository,
      listarProducaoUseCase,
    );
    createProducaoController = new CreateProducaoController(
      createProducaoUseCase,
    );
    listarProducaoController = new ListarProducaoController(
      listarProducaoUseCase,
    );
    alterarStatusProducaoController = new AlterarStatusProducaoController(
      alterarStatusProducaoUseCase,
    );
  });

  describe('handler', () => {
    it('should start the producer', async () => {
      const responseMock = {
        status: jest.fn((x) => x),
        send: jest.fn((x) => x),
      } as unknown as Response;

      const resquestMock = {
        params: { id: '1' },
        body: { status: 'Finalizado' },
      } as unknown as Request;

      expect(
        await createProducaoController.handle(
          {
            id: '1',
            numeroPedido: 1,
          },
          responseMock,
        ),
      ).toBe(HttpStatus.CREATED);

      expect(
        await alterarStatusProducaoController.handle(
          resquestMock,
          responseMock,
        ),
      ).toBe(HttpStatus.OK);

      expect(await listarProducaoController.handle('1')).toEqual({
        id: '1',
        numeroPedido: 1,
        status: 'Finalizado',
      });
    });
  });
});
