import { describe, expect, it, afterEach } from 'vitest';
import Sinon from 'sinon';
import { Equity } from '../../../../src/domain/stocks/Equity';
import { Company } from '../../../../src/domain/companies/Company';
import { CompanyGateway } from '../../../../src/domain/companies/CompanyGateway.interface';
import { Objects } from '../../../../src/utils/Objects';
import { StockGateway } from '../../../../src/domain/stocks/StockGateway.interface';
import { CreateStockCommand } from '../../../../src/application/stocks/CreateStockCommand';
import { DefaultCreateStockUseCase } from '../../../../src/application/stocks/DefaultCreateStockUseCase';

const companyGateway = {
  findById: function () {},
} as unknown as CompanyGateway;

const stockGateway = {
  create: function () {},
} as unknown as StockGateway;

describe('CreateEquityUseCase', () => {
  const company = Company.create('25316853000168', 'Company Test');

  afterEach(() => {
    Sinon.restore();
  });

  it('should create a new Stock Equity UseCase', async () => {
    const expectedEquity = Equity.create(company, 'XPTO11', 1, 0.1);

    const command = CreateStockCommand.with(
      expectedEquity.getCode().getValue(),
      expectedEquity.getCompany().getValue(),
      expectedEquity.getPrice(),
      expectedEquity.getDividend(),
    );

    const companyGatewayMock = Sinon.mock(companyGateway)
      .expects('findById')
      .resolves(company);

    const stockGatewayMock = Sinon.mock(stockGateway)
      .expects('create')
      .resolves(expectedEquity);

    const createStockUseCase = new DefaultCreateStockUseCase(
      companyGateway,
      stockGateway,
    );

    const output = (await createStockUseCase.execute(command)).getValue();

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();

    expect(companyGatewayMock.callCount).toBe(1);
    const findCompanyArgs = companyGatewayMock.getCall(0).args[0];
    expect(findCompanyArgs.getValue()).toBe(company.getId().getValue());

    expect(stockGatewayMock.callCount).toBe(1);
    const createStockArgs = stockGatewayMock.getCall(0).args[0];
    expect(Objects.isNull(createStockArgs.getId())).toBeFalsy();
    expect(createStockArgs.getCode().getValue()).toBe(
      expectedEquity.getCode().getValue(),
    );
    expect(createStockArgs.getType()).toBe(expectedEquity.getType());
    expect(createStockArgs.getPrice()).toBe(expectedEquity.getPrice());
    expect(createStockArgs.getDividend()).toBe(expectedEquity.getDividend());
  });
});
