import { randomUUID } from 'crypto';
import { Identifier } from '../Identifier';
import { Objects } from 'src/utils/Objects';

export class CompanyID extends Identifier {
  protected value: string;

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

  public static from(id: string) {
    return new CompanyID(Objects.requireNonNull(id));
  }
}
