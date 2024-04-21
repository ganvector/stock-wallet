import { DomainError } from './Error';

export interface Validation<T> {
  validate(): T;
}

export interface ValidationHandler {
  append(validation: DomainError);
  append(validation: ValidationHandler);
  validate<T>(validation: Validation<T>): T;
  hasError(): boolean;
  getErrors(): Array<DomainError>;
}
