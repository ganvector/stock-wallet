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

  getErrors(): Array<DomainError> {
    return [];
  }

  hasError(): boolean {
    return false;
  }

  validate<T>(validation: Validation<T>): T {
    try {
      return validation.validate();
    } catch (error: any) {
      throw DomainException.from(error.message);
    }
  }
}
