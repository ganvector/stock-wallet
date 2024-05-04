import { UseCase } from '../UseCase';
import { CreateStockCommand } from './CreateStockCommand';
import { Either } from '../../utils/monads/Either';
import { CreateStockOutput } from './CreateStockOutput';
import { Notification } from '../../domain/validation/handlers/Notification';

export abstract class CreateStockUseCase extends UseCase<
  CreateStockCommand,
  Promise<Either<Notification, CreateStockOutput>>
> {}
