import { randomUUID } from 'crypto';
import { Identifier } from '../Identifier';

export class CompanyID extends Identifier {
  private value: string;

  protected constructor(aValue: string) {
    super();
    this.value = aValue;
  }

  getValue(): string {
    return this.value;
  }

  public static create() {
    return new CompanyID(randomUUID().toString());
  }
}
