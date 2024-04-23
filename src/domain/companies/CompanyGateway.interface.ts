import { Company } from './Company';

export interface CompanyGateway {
  create(company: Company): Promise<Company>;
}
