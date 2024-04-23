import { CompanyID } from 'src/domain/companies/CompanyID';
import { GetCompanyByIdOutput } from './GetCompanyByIdOutput';
import { GetCompanyByIdUseCase } from './GetCompanyByIdUseCase';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { CompanyGateway } from 'src/domain/companies/CompanyGateway.interface';

export class DefaultGetCompanyByIdUseCase extends GetCompanyByIdUseCase {
  constructor(private readonly companyGateway: CompanyGateway) {
    super();
  }

  async execute(anId: string): Promise<GetCompanyByIdOutput> {
    const companyId = CompanyID.from(anId);
    const company = await this.companyGateway.findById(companyId);
    if (!company) {
      throw NotFoundException.fromId(companyId);
    }
    return GetCompanyByIdOutput.create(company);
  }
}
