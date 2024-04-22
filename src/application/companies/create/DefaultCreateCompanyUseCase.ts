import { Objects } from 'src/utils/Objects';
import { CreateCompanyCommand } from './CreateCompanyCommand';
import { CreateCompanyOutput } from './CreateCompanyOutput';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';
import { Either } from 'src/utils/monads/Either';
import { Notification } from 'src/domain/validation/handlers/Notification';
import { MonadsAPI } from 'src/utils/monads';

interface CompanyGateway {}

export class DefaultCreateCompanyUseCase extends CreateCompanyUseCase {
  private readonly companyGateway: CompanyGateway; //TODO fazer interface em outro arquivo

  constructor(companyGateway: CompanyGateway) {
    super();
    this.companyGateway = Objects.requireNonNull(companyGateway);
  }

  public async execute(
    input: CreateCompanyCommand,
  ): Promise<Either<Notification, CreateCompanyOutput>> {
    console.log(input);
    const notification = Notification.create();

    return notification.hasError()
      ? MonadsAPI.Left(notification)
      : MonadsAPI.Right(CreateCompanyOutput.create('1'));
  }
}
