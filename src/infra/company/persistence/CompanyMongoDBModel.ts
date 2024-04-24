import { HydratedDocument, Model, Schema, model } from 'mongoose';
import { Cnpj } from 'src/domain/companies/Cnpj';
import { Company } from 'src/domain/companies/Company';
import { CompanyID } from 'src/domain/companies/CompanyID';

interface ICompany {
  _id: string;
  cnpj: string;
  name: string;
}

interface ICompanyMethods {
  toAggregate(): Company;
}

interface ICompanyModel extends Model<ICompany, object, ICompanyMethods> {
  from(company: Company): Promise<HydratedDocument<ICompany, ICompanyMethods>>;
}

const schema = new Schema<ICompany, ICompanyModel, ICompanyMethods>({
  _id: { type: String, required: true },
  cnpj: { type: String, required: true },
  name: { type: String, required: true },
});

schema.method('toAggregate', function toAggregate() {
  const companyId = CompanyID.from(this._id as string);
  const companyCnpj = Cnpj.from(this.cnpj as string);
  return Company.with(companyId, companyCnpj, this.name);
});

schema.static({
  from: function (company: Company) {
    return new this({
      name: company.getName(),
      _id: company.getId().getValue(),
      cnpj: company.getCnpj().getValue(),
    });
  },
});

export abstract class CompanyMongoDbModel {
  public static readonly MODEL = model<ICompany, ICompanyModel>(
    'Company',
    schema,
    'companies',
  );
}
