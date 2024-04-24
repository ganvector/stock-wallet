import { Company } from 'src/domain/companies/Company';
import { CompanyGateway } from 'src/domain/companies/CompanyGateway.interface';
import { CompanyID } from 'src/domain/companies/CompanyID';
import { CompanyMongoDbModel } from './CompanyMongoDBModel';

export class CompanyMongoDBGateway implements CompanyGateway {
  async create(company: Company): Promise<Company> {
    const createdCompany = await CompanyMongoDbModel.MODEL.create(
      CompanyMongoDbModel.MODEL.from(company),
    );
    return createdCompany.toAggregate();
  }

  async findById(anId: CompanyID): Promise<Company> {
    const existingCompany = await CompanyMongoDbModel.MODEL.findById(
      anId.getValue(),
    );
    return existingCompany?.toAggregate();
  }
}
