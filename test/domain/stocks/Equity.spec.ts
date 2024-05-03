import { describe, it, expect } from 'vitest';
import { Company } from '../../../src/domain/companies/Company';
import { Equity } from '../../../src/domain/stocks/Equity';
import { ThrowsValidationHandler } from '../../../src/domain/validation/handlers/ThrowsValidationHandler';
import { StockID } from '../../../src/domain/stocks/StockID';

describe('Equity', () => {
  const company = Company.create('25316853000168', 'Company Test');

  it('should return a valid Equity Stock given the right parameters', () => {
    const expectedCode = 'XPTO4';
    const expectedPrice = 8.55;
    const expectedDividend = 0.888;
    const expectedDividendYield = 10.39;
    const expectedType = 'EQUITY';

    const handler = new ThrowsValidationHandler();

    const actualEquity = Equity.create(
      company,
      expectedCode,
      expectedPrice,
      expectedDividend,
    );

    expect(actualEquity.getId()).toBeDefined();
    expect(actualEquity.getCompany().getValue()).toBe(
      company.getId().getValue(),
    );
    expect(actualEquity.getCode().getValue()).toBe(expectedCode);
    expect(actualEquity.getPrice()).toBe(expectedPrice);
    expect(actualEquity.getDividend()).toBe(expectedDividend);
    expect(actualEquity.getDividendYield()).toBeCloseTo(expectedDividendYield);
    expect(actualEquity.getType()).toBe(expectedType);
    expect(() => actualEquity.validate(handler)).not.toThrow();
  });

  it('should raise an error if Code is null', () => {
    const expectedError = "'code' não deve ser nulo";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, undefined as any, 1, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Code is empty', () => {
    const expectedError = "'code' não deve ser vazio";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, '', 1, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Code has less than 5 characters', () => {
    const expectedError = "'code' deve conter entre 5 e 6 caracteres";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'aa', 1, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Code has more than 6 characters', () => {
    const expectedError = "'code' deve conter entre 5 e 6 caracteres";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'aaaaaaa', 1, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Price is null', () => {
    const expectedError = "'price' não deve ser nulo";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', undefined, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Price is not a valid number', () => {
    const expectedError = "'price' deve ser do tipo numérico";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', 'test1' as any, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Price is less or equal than 0', () => {
    const expectedError = "'price' deve ser maior que zero";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', 0, 1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  //
  it('should raise an error if Dividend is null', () => {
    const expectedError = "'dividend' não deve ser nulo";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', 1, undefined);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Dividend is not a valid number', () => {
    const expectedError = "'dividend' deve ser do tipo numérico";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', 1, 'teste1' as any);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should raise an error if Dividend is less than 0', () => {
    const expectedError = "'dividend' não deve ser menor que zero";

    const handler = new ThrowsValidationHandler();
    const equity = Equity.create(company, 'XPTO11', 1, -1);

    expect(() => equity.validate(handler)).toThrow(expectedError);
  });

  it('should load the Equity with the expected values', () => {
    const expectedId = 'expectedIdTest';
    const expectedCode = 'XPTO2';
    const expectedPrice = 8.55;
    const expectedDividend = 0.888;
    const expectedDividendYield = 10.39;
    const expectedType = 'EQUITY';

    const handler = new ThrowsValidationHandler();

    const actualEquity = Equity.with(
      expectedId,
      company.getId().getValue(),
      expectedCode,
      expectedPrice,
      expectedDividend,
    );

    expect(actualEquity.getId()).toBeDefined();
    expect(actualEquity.getId().getValue()).toBe(expectedId);
    expect(actualEquity.getCompany().getValue()).toBe(
      company.getId().getValue(),
    );
    expect(actualEquity.getCode().getValue()).toBe(expectedCode);
    expect(actualEquity.getPrice()).toBe(expectedPrice);
    expect(actualEquity.getDividend()).toBe(expectedDividend);
    expect(actualEquity.getDividendYield()).toBeCloseTo(expectedDividendYield);
    expect(actualEquity.getType()).toBe(expectedType);
  });
});
