import { CreateProducaoController } from '../src/producao/controller/CreateProducao.controller';
import { CreateProducaoUseCase } from '../src/producao/usecases/createProducao.usecase';
import { ProducaoRepository } from '../src/producao/repository/producacao.repository';
import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ListarProducaoUseCase } from '../src/producao/usecases/listarproducao.usecase';
import { ListarProducaoController } from '../src/producao/controller/ListarProducao.controller';

describe('ListaProducaoController', () => {
  let producaoRepository;
  let createProducaoController: CreateProducaoController;
  let createProducaoUseCase: CreateProducaoUseCase;
  let listarProducaoUseCase: ListarProducaoUseCase;
  let listarProducaoController: ListarProducaoController;

  beforeEach(async () => {
    producaoRepository = new ProducaoRepository();
    createProducaoUseCase = new CreateProducaoUseCase(producaoRepository);
    listarProducaoUseCase = new ListarProducaoUseCase(producaoRepository);
    createProducaoController = new CreateProducaoController(
      createProducaoUseCase,
    );
    listarProducaoController = new ListarProducaoController(
      listarProducaoUseCase,
    );
  });

  describe('handler', () => {
    it('should list a product', async () => {
      const responseMock = {
        status: jest.fn((x) => x),
        send: jest.fn((x) => x),
      } as unknown as Response;

      const resquestMock = {
        params: { numeroPedido: 1 },
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

      expect(await listarProducaoController.handle(resquestMock)).toEqual({
        id: '1',
        numeroPedido: 1,
        status: 'in production',
      });
    });
  });
});
