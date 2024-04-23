import { afterEach, describe, expect, it } from 'vitest';
import Sinon from 'sinon';
import { CompanyGateway } from 'src/domain/companies/CompanyGateway.interface';
import { Company } from 'src/domain/companies/Company';
import { DefaultGetCompanyByIdUseCase } from 'src/application/companies/retrieve/get/DefaultGetCompanyByIdUseCase';
import { Objects } from 'src/utils/Objects';
import { CompanyID } from 'src/domain/companies/CompanyID';

const companyGateway = {
  findById: function () {},
} as unknown as CompanyGateway;

describe('GetCompanyById', () => {
  afterEach(() => {
    Sinon.restore();
  });

  it('should return a company successfully', async () => {
    const expectedCompany = Company.create('25316853000168', 'Company Test');
    const expectedId = expectedCompany.getId();

    const mock = Sinon.mock(companyGateway)
      .expects('findById')
      .resolves(expectedCompany);

    const getCompanyById = new DefaultGetCompanyByIdUseCase(companyGateway);

    const output = await getCompanyById.execute(expectedId.getValue());

    expect(Objects.isNull(output)).toBeFalsy();
    expect(output.id).toBe(expectedCompany.getId().getValue());
    expect(output.name).toBe(expectedCompany.getName());
    expect(output.cnpj).toBe(expectedCompany.getCnpj().getValue());

    expect(mock.callCount).toBe(1);
    const id = mock.getCall(0).args[0];
    expect(Objects.equals(id, expectedCompany.getId())).toBeTruthy();
  });

  it('should return throw an error when company does not exists', async () => {
    const expectedId = CompanyID.from('1234');
    const expectedErrorMessage = "O recurso de ID '1234' não foi encontrado";

    const mock = Sinon.mock(companyGateway)
      .expects('findById')
      .resolves(undefined);

    const getCompanyById = new DefaultGetCompanyByIdUseCase(companyGateway);

    await expect(() =>
      getCompanyById.execute(expectedId.getValue()),
    ).rejects.toThrow(expectedErrorMessage);

    expect(mock.callCount).toBe(1);
    const id: CompanyID = mock.getCall(0).args[0];
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
