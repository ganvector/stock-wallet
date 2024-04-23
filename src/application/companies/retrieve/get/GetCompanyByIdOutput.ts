import { Company } from 'src/domain/companies/Company';

export class GetCompanyByIdOutput {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cnpj: string,
  ) {}

  static create(company: Company): GetCompanyByIdOutput {
    return new GetCompanyByIdOutput(
      company.getId().getValue(),
      company.getName(),
      company.getCnpj().getValue(),
    );
  }
}
