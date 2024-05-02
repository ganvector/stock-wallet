import { describe, expect, it, afterEach, beforeAll } from 'vitest';
import { E2ETest } from './E2ETest';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { CreateCompanyCommand } from 'src/application/companies/create/CreateCompanyCommand';
import { HttpApiGateway } from './HttpApiGateway';

describe('Company E2E', () => {
  const companyGateway = new HttpApiGateway(
    'http://localhost:3000/api/company',
  );

  beforeAll(async () => {
    await E2ETest.start();
  });

  afterEach(async () => {
    await mongoose.connection.db.collection('companies').deleteMany({});
    Sinon.restore();
  });

  it('CREATE: should create a new Category', async () => {
    const expectedName = 'Company Test';
    const expectedCnpj = '25316853000168';
    const command = CreateCompanyCommand.create(expectedName, expectedCnpj);

    const output = await companyGateway.post('', command);

    expect(output.status).toBe(201);
    expect(output.data).toBeDefined();
    expect(output.data.id).toBeDefined();

    const actual = await mongoose.connection.db
      .collection('companies')
      .findOne();

    expect(actual.name).toBe(expectedName);
    expect(actual.cnpj).toBe(expectedCnpj);
    expect(actual._id).toBe(output.data.id);
  });

  it('CREATE: should return an error when input is invalid', async () => {
    const expectedErrorCount = 2;
    const expectedError1 = "'nome' deve conter entre 3 e 255 caracteres";
    const expectedError2 = "'cnpj' inválido";
    const command = CreateCompanyCommand.create('Co', '25316853000167');

    const output = await companyGateway.post('', command);

    expect(output.status).toBe(400);
    expect(output.data).toBeDefined();
    expect(output.data.errors).toBeDefined();

    const actualErrors = output.data.errors;
    expect(actualErrors).toHaveLength(expectedErrorCount);
    expect(actualErrors[0].message).toBe(expectedError1);
    expect(actualErrors[1].message).toBe(expectedError2);
  });

  it('RETRIEVE: should return the company when company ID is valid', async () => {
    const expectedName = 'Company Test';
    const expectedCnpj = '25316853000168';
    const command = CreateCompanyCommand.create(expectedName, expectedCnpj);

    const createOutput = await companyGateway.post('', command);
    const expectedId = createOutput.data.id;

    const output = await companyGateway.get(expectedId);
    expect(output.status).toBe(200);
    expect(output.data).toBeDefined();

    expect(output.data.id).toBe(expectedId);
    expect(output.data.name).toBe(expectedName);
    expect(output.data.cnpj).toBe(expectedCnpj);
  });

  it('RETRIEVE: should return throw an error when company does not exists', async () => {
    const expectedErrorMessage = "O recurso de ID '123' não foi encontrado";
    const output = await companyGateway.get('123');
    expect(output.status).toBe(404);
    expect(output.data).toBeDefined();
    expect(output.data).toBe(expectedErrorMessage);
  });
});
