import { UseCase } from 'src/application/UseCase';
import { GetCompanyByIdOutput } from './GetCompanyByIdOutput';

export abstract class GetCompanyByIdUseCase extends UseCase<
  string,
  Promise<GetCompanyByIdOutput>
> {}
