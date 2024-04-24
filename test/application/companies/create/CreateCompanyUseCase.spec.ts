import { describe, expect, it, afterEach } from 'vitest';
import { CreateCompanyCommand } from 'src/application/companies/create/CreateCompanyCommand';
import Sinon from 'sinon';
import { CompanyGateway } from 'src/domain/companies/CompanyGateway.interface';
import { Company } from 'src/domain/companies/Company';
import { DefaultCreateCompanyUseCase } from 'src/application/companies/create/DefaultCreateCompanyUseCase';
import { Objects } from 'src/utils/Objects';

const companyGateway = { create: function () {} } as unknown as CompanyGateway;

describe('CreateCompany', () => {
  afterEach(() => {
    Sinon.restore();
  });

  it('should create a new Category', async () => {
    const command = CreateCompanyCommand.create(
      'Company Test',
      '25316853000168',
    );

    const expectedCompany = Company.create('25316853000168', 'Company Test');

    const mock = Sinon.mock(companyGateway)
      .expects('create')
      .resolves(expectedCompany);

    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );

    const output = (await createCompanyUseCase.execute(command)).getValue();

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();

    expect(mock.callCount).toBe(1);
    const args: Company = mock.getCall(0).args[0];
    expect(Objects.isNull(args.getId())).toBeFalsy();
    expect(Objects.equals(args.getCnpj(), expectedCompany.getCnpj()));
    expect(args.getName()).toBe(expectedCompany.getName());
  });

  it('should return an error new Category is invalid', async () => {
    const expectedErrorCount = 2;
    const command = CreateCompanyCommand.create('Co', '25316853000167');

    const mock = Sinon.mock(companyGateway).expects('create').resolves({});

    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );

    const notification = (
      await createCompanyUseCase.execute(command)
    ).getLeft();

    expect(notification).toBeDefined();
    expect(notification.getErrors().length).toBe(expectedErrorCount);
    expect(mock.callCount).toBe(0);
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
