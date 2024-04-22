import { AggregationRoot } from '../AggregationRoot';
import { ValidationHandler } from '../validation/ValidationHandler.interface';
import { Cnpj } from './Cnpj';
import { CompanyID } from './CompanyID';
import { CompanyValidator } from './CompanyValidator';

export class Company extends AggregationRoot<CompanyID> {
  private readonly cnpj: Cnpj;
  private readonly name: string;

  private constructor(id: CompanyID, cnpj: Cnpj, name: string) {
    super(id);
    this.cnpj = cnpj;
    this.name = name;
  }

  public getCnpj(): Cnpj {
    return this.cnpj;
  }

  public getName(): string {
    return this.name;
  }

  public static create(aCnpj: string, aName: string): Company {
    const id = CompanyID.create();
    const cnpj = Cnpj.from(aCnpj);
    const company = new Company(id, cnpj, aName);
    return company;
  }

  public static with(id: CompanyID, cnpj: Cnpj, name: string) {
    return new Company(id, cnpj, name);
  }

  public validate(handler: ValidationHandler): void {
    new CompanyValidator(this, handler).validate();
  }
}
