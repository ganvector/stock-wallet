import { Objects } from 'src/utils/Objects';
import { ValidationHandler } from '../validation/ValidationHandler.interface';
import { Validator } from '../validation/Validator';
import { Company } from './Company';
import { DomainError } from '../validation/Error';

export class CompanyValidator extends Validator {
  private static NAME_MAX_LENGTH = 255;
  private static NAME_MIN_LENGTH = 3;
  private readonly company: Company;

  constructor(company: Company, handler: ValidationHandler) {
    super(handler);
    this.company = company;
  }

  public validate(): void {
    this.checkCompanyName();
    this.checkCompanyCnpj();
  }

  private checkCompanyName(): void {
    const name = this.company.getName();
    if (Objects.isNull(name) || Objects.isUndefined(name)) {
      this.getHandler().append(new DomainError("'nome' não deve ser nulo"));
      return;
    }
    if (!name.trim()) {
      this.getHandler().append(new DomainError("'nome' não deve ser vazio"));
      return;
    }
    const nameSize = name.trim().length;
    if (
      nameSize > CompanyValidator.NAME_MAX_LENGTH ||
      nameSize < CompanyValidator.NAME_MIN_LENGTH
    ) {
      this.getHandler().append(
        new DomainError("'nome' deve conter entre 3 e 255 caracteres"),
      );
    }
  }

  private checkCompanyCnpj(): void {
    const cnpj = this.company.getCnpj();
    if (!cnpj.isValid()) {
      this.getHandler().append(new DomainError("'cnpj' inválido"));
    }
  }
}
