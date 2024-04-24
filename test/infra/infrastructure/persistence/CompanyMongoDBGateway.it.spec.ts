import { Company } from 'src/domain/companies/Company';
import { beforeAll, describe, expect, it } from 'vitest';
import { CompanyMongoDBGateway } from 'src/infra/company/persistence/CompanyMongoDBGateway';
import { CompanyID } from 'src/domain/companies/CompanyID';
import { IntegrationTest } from 'test/infra/IntegrationTest';

describe('CompanyMongoDBGateway', () => {
  beforeAll(async () => {
    await IntegrationTest.start();
  });

  it('should persist a new company', async () => {
    const actualCompany = Company.create('25316853000168', 'Company Test');
    const gateway = new CompanyMongoDBGateway();

    const result = await gateway.create(actualCompany);

    expect(result).toBeDefined();
    expect(result.getId().getValue()).toBe(actualCompany.getId().getValue());

    const expectedCompany = await gateway.findById(actualCompany.getId());

    expect(actualCompany.getId().getValue()).toBe(
      expectedCompany.getId().getValue(),
    );
    expect(actualCompany.getCnpj().getValue()).toBe(
      expectedCompany.getCnpj().getValue(),
    );
    expect(actualCompany.getName()).toBe(expectedCompany.getName());
  });

  it('should return empty when give an invalid id', async () => {
    const gateway = new CompanyMongoDBGateway();

    const result = await gateway.findById(CompanyID.from('teste'));

    expect(result).toBeUndefined();
  });
});
