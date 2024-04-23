import { describe, expect, it } from 'vitest';
import { Company } from 'src/domain/companies/Company';
import { ThrowsValidationHandler } from 'src/domain/validation/handlers/ThrowsValidationHandler';

describe('Company', () => {
  it('should return a valid Company given the right parameters', () => {
    const expectedName = 'Company Test';
    const expectedCnpj = '25316853000168';

    const company = Company.create('25316853000168', 'Company Test');

    expect(company.getId()).toBeDefined();
    expect(company.getId().getValue().length).toBeGreaterThan(0);
    expect(company.getName()).toBe(expectedName);
    expect(company.getCnpj().getValue()).toBe(expectedCnpj);
    expect(() => company.validate(new ThrowsValidationHandler())).not.toThrow();
  });

  it('should raise an error if Company name is null', () => {
    const expectedError = "'nome' não deve ser nulo";

    const company = Company.create('25316853000168', undefined as any);

    expect(() => company.validate(new ThrowsValidationHandler())).toThrow(
      expectedError,
    );
  });

  it('should raise an error if Company name is empty', () => {
    const expectedError = "'nome' não deve ser vazio";

    const company = Company.create('25316853000168', '');

    expect(() => company.validate(new ThrowsValidationHandler())).toThrow(
      expectedError,
    );
  });

  it('should raise an error if Company name has less than 3 characters', () => {
    const expectedError = "'nome' deve conter entre 3 e 255 caracteres";

    const company = Company.create('25316853000168', '12');

    expect(() => company.validate(new ThrowsValidationHandler())).toThrow(
      expectedError,
    );
  });

  it('should raise an error if Company name has more than 255 characters', () => {
    const expectedError = "'nome' deve conter entre 3 e 255 caracteres";
    const actualName =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget turpis sed dui pulvinar condimentum cursus vel risus. Etiam tincidunt tortor a magna faucibus volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus efficitur, est et amet.';
    const company = Company.create('25316853000168', actualName);

    expect(() => company.validate(new ThrowsValidationHandler())).toThrow(
      expectedError,
    );
  });

  it('should raise an error if Company cnpj is invalid', () => {
    const expectedError = "'cnpj' inválido";

    const company = Company.create('25316853000163', 'Company test');

    expect(() => company.validate(new ThrowsValidationHandler())).toThrow(
      expectedError,
    );
  });
});
