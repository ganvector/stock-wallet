import { Objects } from 'src/utils/Objects';
import { CreateCompanyCommand } from './CreateCompanyCommand';
import { CreateCompanyOutput } from './CreateCompanyOutput';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';
import { Either } from 'src/utils/monads/Either';
import { Notification } from 'src/domain/validation/handlers/Notification';
import { MonadsAPI } from 'src/utils/monads';
import { CompanyGateway } from 'src/domain/companies/CompanyGateway.interface';
import { Company } from 'src/domain/companies/Company';

export class DefaultCreateCompanyUseCase extends CreateCompanyUseCase {
  private readonly companyGateway: CompanyGateway;

  constructor(companyGateway: CompanyGateway) {
    super();
    this.companyGateway = Objects.requireNonNull(companyGateway);
  }

  public async execute(
    input: CreateCompanyCommand,
  ): Promise<Either<Notification, CreateCompanyOutput>> {
    const notification = Notification.create();

    const company = Company.create(input.cnpj, input.name);
    company.validate(notification);

    return notification.hasError()
      ? MonadsAPI.Left(notification)
      : this.create(company);
  }

  private async create(
    company: Company,
  ): Promise<Either<Notification, CreateCompanyOutput>> {
    try {
      const createdCompany = await this.companyGateway.create(company);
      return MonadsAPI.Right(CreateCompanyOutput.from(createdCompany));
    } catch (error: any) {
      return MonadsAPI.Left(Notification.create(error));
    }
  }
}
