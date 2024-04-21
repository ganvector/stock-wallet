import { ValueObject } from './ValueObjects';

export abstract class Identifier extends ValueObject {
  abstract getValue(): string;
}
