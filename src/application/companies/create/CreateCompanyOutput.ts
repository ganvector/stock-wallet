import { Company } from 'src/domain/companies/Company';

export class CreateCompanyOutput {
  private constructor(public readonly id: string) {}

  public static from(company: Company) {
    return new CreateCompanyOutput(company.getId().getValue());
  }
}
