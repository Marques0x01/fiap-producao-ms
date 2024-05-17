import { Given, When, Then, BeforeAll } from '@cucumber/cucumber';
import { CreateProducaoController } from '../../src/producao/controller/CreateProducao.controller';
import { CreateProducaoUseCase } from '../../src/producao/usecases/createProducao.usecase';
import { ListarProducaoController } from '../../src/producao/controller/ListarProducao.controller';
import { ListarProducaoUseCase } from '../../src/producao/usecases/listarproducao.usecase';
import { ProducaoRepository } from '../../src/producao/repository/producacao.repository';
import assert from 'assert';
import { Response } from 'express';

let producaoRepository;
let createProducaoController: CreateProducaoController;
let createProducaoUseCase: CreateProducaoUseCase;
let listarProducaoController: ListarProducaoController;

let listarProducaoUseCase: ListarProducaoUseCase;
let orderId: number;

BeforeAll(() => {
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

Given('I received order with ID {string}', (id: string) => {
  assert.equal(id, '51234');
  orderId = Number.parseInt(id);
});

When('the production team adds it to the production queue', async () => {
  const responseMock = {
    status: (x) => x,
    send: (x) => x,
  } as unknown as Response;

  assert.equal(
    await createProducaoController.handle(
      {
        id: '1',
        numeroPedido: orderId,
      },
      responseMock,
    ),
    201,
  );
});

Then('the queue should contain {string}', async (numeroPedido: string) => {
  assert.equal(
    (await listarProducaoController.handle(Number.parseInt(numeroPedido))).id,
    '1',
  );
});

Then('the order status should be {string}', async (status: string) => {
  assert.equal((await listarProducaoController.handle(orderId)).status, status);
});
