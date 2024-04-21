import { DomainException } from '../../exceptions/DomainException';
import { DomainError } from '../Error';
import { Validation, ValidationHandler } from '../ValidationHandler.interface';

export class Notification implements ValidationHandler {
  private errors: DomainError[];

  private constructor(errors: DomainError[]) {
    this.errors = errors;
  }

  static create(error?: DomainError | Error): Notification {
    if (error instanceof DomainError) {
      return new Notification([error]);
    }
    if (error instanceof Error) {
      return new Notification([new DomainError(error.message)]);
    }
    return new Notification([]);
  }

  append(validation: ValidationHandler | DomainError): void {
    if (validation instanceof DomainError) {
      this.errors.push(validation);
      return;
    }
    this.errors.concat(validation.getErrors());
  }

  validate<T>(validation: Validation<T>): T {
    try {
      return validation.validate();
    } catch (exception: any) {
      if (exception instanceof DomainException) {
        this.errors.concat(exception.getErrors());
      }
      this.errors.push(new DomainError(exception.getMessage()));
    }
    return null as T;
  }

  hasError(): boolean {
    throw new Error('Method not implemented.');
  }

  getErrors(): Error[] {
    throw new Error('Method not implemented.');
  }
}
