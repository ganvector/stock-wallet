import { Identifier } from '../Identifier';
import { DomainError } from '../validation/Error';
import { DomainException } from './DomainException';

export class NotFoundException extends DomainException {
  protected constructor(message: string, errors: DomainError[]) {
    super(message, errors);
  }

  static fromId(id: Identifier): NotFoundException {
    const message = `O recurso de ID '${id.getValue()}' não foi encontrado`;
    return new NotFoundException(message, [new DomainError(message)]);
  }
}
