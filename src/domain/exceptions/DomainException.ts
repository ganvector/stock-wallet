import { DomainError } from '../validation/Error';
import { NoStackTraceException } from './NoStackTraceException.interface';

export class DomainException extends NoStackTraceException {
  protected readonly errors: DomainError[];

  protected constructor(message: string, errors: DomainError[]) {
    super(message);
    this.errors = errors;
  }

  public getErrors(): DomainError[] {
    return this.errors;
  }

  static from(error: DomainError | DomainError[]): DomainException {
    if (error instanceof DomainError) {
      return new DomainException(error.message, [error]);
    }
    return new DomainException('', error);
  }
}
