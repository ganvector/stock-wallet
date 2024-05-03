import { Validation, ValidationHandler } from '../ValidationHandler.interface';
import { DomainError } from '../Error';
import { DomainException } from '../../exceptions/DomainException';

export class ThrowsValidationHandler implements ValidationHandler {
  append(validation: DomainError | ValidationHandler) {
    if (validation instanceof DomainError) {
      throw DomainException.from(validation);
    }
    throw DomainException.from(validation.getErrors());
  }

  getErrors(): never {
    throw new Error('Not implemented');
  }

  hasError(): never {
    throw new Error('Not implemented');
  }

  validate<T>(validation: Validation<T>): T {
    try {
      return validation.validate();
    } catch (error: any) {
      throw DomainException.from(error.message);
    }
  }
}
