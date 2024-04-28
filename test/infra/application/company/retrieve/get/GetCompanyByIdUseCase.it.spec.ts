import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import Sinon from 'sinon';
import { Company } from 'src/domain/companies/Company';
import { DefaultGetCompanyByIdUseCase } from 'src/application/companies/retrieve/get/DefaultGetCompanyByIdUseCase';
import { Objects } from 'src/utils/Objects';
import { CompanyID } from 'src/domain/companies/CompanyID';
import mongoose from 'mongoose';
import { CompanyMongoDBGateway } from 'src/infra/company/persistence/CompanyMongoDBGateway';
import { IntegrationTest } from 'test/infra/IntegrationTest';

describe('GetCompanyById', () => {
  const companyGateway = new CompanyMongoDBGateway();

  beforeAll(async () => {
    await IntegrationTest.start();
  });

  afterEach(async () => {
    await mongoose.connection.db.collection('companies').deleteMany({});
    Sinon.restore();
  });

  it('should return a company successfully', async () => {
    const expectedCompany = Company.create('25316853000168', 'Company Test');
    const expectedId = expectedCompany.getId();

    await companyGateway.create(expectedCompany);

    const mock = Sinon.spy(companyGateway);

    const getCompanyById = new DefaultGetCompanyByIdUseCase(companyGateway);

    const output = await getCompanyById.execute(expectedId.getValue());

    expect(Objects.isNull(output)).toBeFalsy();
    expect(output.id).toBe(expectedCompany.getId().getValue());
    expect(output.name).toBe(expectedCompany.getName());
    expect(output.cnpj).toBe(expectedCompany.getCnpj().getValue());

    expect(mock.findById.callCount).toBe(1);
    const id = mock.findById.getCall(0).args[0];
    expect(Objects.equals(id, expectedCompany.getId())).toBeTruthy();
  });

  it('should return throw an error when company does not exists', async () => {
    const expectedId = CompanyID.from('1234');
    const expectedErrorMessage = "O recurso de ID '1234' não foi encontrado";

    const mock = Sinon.spy(companyGateway);

    const getCompanyById = new DefaultGetCompanyByIdUseCase(companyGateway);

    await expect(() =>
      getCompanyById.execute(expectedId.getValue()),
    ).rejects.toThrow(expectedErrorMessage);

    expect(mock.findById.callCount).toBe(1);
    const id: CompanyID = mock.findById.getCall(0).args[0];
    expect(Objects.equals(id, expectedId)).toBeTruthy();
  });

  it('should return an exception when gateway throws', async () => {
    const expectedId = CompanyID.from('1234');
    const expectedErrorMessage = 'Gateway Error';

    const mock = Sinon.mock(companyGateway)
      .expects('findById')
      .throws(new Error('Gateway Error'));

    const getCompanyById = new DefaultGetCompanyByIdUseCase(companyGateway);

    await expect(() =>
      getCompanyById.execute(expectedId.getValue()),
    ).rejects.toThrow(expectedErrorMessage);

    expect(mock.callCount).toBe(1);
    const id: CompanyID = mock.getCall(0).args[0];
    expect(Objects.equals(id, expectedId)).toBeTruthy();
  });
});
