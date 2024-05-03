import { Objects } from 'src/utils/Objects';
import { Identifier } from '../Identifier';
import { randomUUID } from 'crypto';

export class StockID extends Identifier {
  protected value: string;

  private constructor(id: string) {
    super();
    this.value = id;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(): StockID {
    const id = randomUUID().toString();
    return new StockID(id);
  }

  public static from(id: string): StockID {
    return new StockID(Objects.requireNonNull(id));
  }
}
