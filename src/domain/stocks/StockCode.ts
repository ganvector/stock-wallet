import { Identifier } from '../Identifier';

export class StockCode extends Identifier {
  protected value: any;

  private constructor(code: string) {
    super();
    this.value = code;
  }

  getValue(): string {
    return this.value;
  }

  public static from(code: string) {
    return new StockCode(code);
  }
}
