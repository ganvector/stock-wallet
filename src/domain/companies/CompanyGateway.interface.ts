import { Company } from './Company';
import { CompanyID } from './CompanyID';

export interface CompanyGateway {
  create(company: Company): Promise<Company>;
  findById(anId: CompanyID): Promise<Company | undefined>;
}
