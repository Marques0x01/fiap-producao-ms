import { CreateProducaoController } from '../src/producao/controller/CreateProducao.controller';
import { CreateProducaoUseCase } from '../src/producao/usecases/createProducao.usecase';
import { ProducaoRepository } from '../src/producao/repository/producacao.repository';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ListarTodasProducoesUseCase } from '../src/producao/usecases/listartodasproducoes.usecase';

describe('CreateProducaoController', () => {
  let producaoRepository;
  let createProducaoController: CreateProducaoController;
  let createProducaoUseCase: CreateProducaoUseCase;
  let listarTodasProducoesUseCase: ListarTodasProducoesUseCase;

  beforeEach(async () => {
    producaoRepository = new ProducaoRepository();
    createProducaoUseCase = new CreateProducaoUseCase(producaoRepository);
    listarTodasProducoesUseCase = new ListarTodasProducoesUseCase(
      producaoRepository,
    );
    createProducaoController = new CreateProducaoController(
      createProducaoUseCase,
    );
  });

  describe('handler', () => {
    it('should start the producer', async () => {
      const responseMock = {
        status: jest.fn((x) => x),
        send: jest.fn((x) => x),
      } as unknown as Response;

      expect(
        await createProducaoController.handle(
          {
            numeroPedido: 1,
          },
          responseMock,
        ),
      ).toBe(HttpStatus.CREATED);

      expect(
        (await listarTodasProducoesUseCase.execute()).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
