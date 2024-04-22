import { UseCase } from 'src/application/UseCase';
import { CreateCompanyCommand } from './CreateCompanyCommand';
import { CreateCompanyOutput } from './CreateCompanyOutput';
import { Either } from 'src/utils/monads/Either';
import { Notification } from 'src/domain/validation/handlers/Notification';

export abstract class CreateCompanyUseCase extends UseCase<
  CreateCompanyCommand,
  Promise<Either<Notification, CreateCompanyOutput>>
> {}
