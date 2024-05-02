import { describe, expect, it, afterEach, beforeAll } from 'vitest';
import { CreateCompanyCommand } from 'src/application/companies/create/CreateCompanyCommand';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import { Company } from 'src/domain/companies/Company';
import { DefaultCreateCompanyUseCase } from 'src/application/companies/create/DefaultCreateCompanyUseCase';
import { Objects } from 'src/utils/Objects';
import { CompanyMongoDBGateway } from 'src/infra/company/persistence/CompanyMongoDBGateway';
import { IntegrationTest } from 'test/infra/IntegrationTest';

describe('CreateCompanyUseCase Integration', () => {
  const companyGateway = new CompanyMongoDBGateway();

  beforeAll(async () => {
    await IntegrationTest.start();
  });

  afterEach(async () => {
    await mongoose.connection.db.collection('companies').deleteMany({});
    Sinon.restore();
  });

  it('should create a new Category', async () => {
    const command = CreateCompanyCommand.create(
      'Company Test',
      '25316853000168',
    );

    const expectedCompany = Company.create('25316853000168', 'Company Test');

    const mock = Sinon.spy(companyGateway);

    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );

    const output = (await createCompanyUseCase.execute(command)).getValue();

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();

    expect(mock.create.callCount).toBe(1);
    const args: Company = mock.create.getCall(0).args[0];
    expect(Objects.isNull(args.getId())).toBeFalsy();
    expect(Objects.equals(args.getCnpj(), expectedCompany.getCnpj()));
    expect(args.getName()).toBe(expectedCompany.getName());
  });

  it('should return an error new Category is invalid', async () => {
    const expectedErrorCount = 2;
    const command = CreateCompanyCommand.create('Co', '25316853000167');

    const mock = Sinon.spy(companyGateway);

    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );

    const notification = (
      await createCompanyUseCase.execute(command)
    ).getLeft();

    expect(notification).toBeDefined();
    expect(notification.getErrors().length).toBe(expectedErrorCount);
    expect(mock.create.callCount).toBe(0);
  });

  it('should return an error gateway throws an unexpected error', async () => {
    const expectedErrorCount = 1;
    const expectedErrorMessage = 'Gateway Error';
    const command = CreateCompanyCommand.create(
      'Company Test',
      '25316853000168',
    );
    const expectedCompany = Company.create('25316853000168', 'Company Test');

    const mock = Sinon.mock(companyGateway)
      .expects('create')
      .throws(new Error('Gateway Error'));

    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );

    const notification = (
      await createCompanyUseCase.execute(command)
    ).getLeft();

    expect(notification).toBeDefined();
    expect(notification.getErrors().length).toBe(expectedErrorCount);
    expect(notification.getErrors()[0].message).toBe(expectedErrorMessage);

    expect(mock.callCount).toBe(1);
    const args: Company = mock.getCall(0).args[0];
    expect(Objects.isNull(args.getId())).toBeFalsy();
    expect(Objects.equals(args.getCnpj(), expectedCompany.getCnpj()));
    expect(args.getName()).toBe(expectedCompany.getName());
  });
});
