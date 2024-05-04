import { Stock } from '../../domain/stocks/Stock';

export class CreateStockOutput {
  private constructor(public readonly id: string) {}

  public static from(stock: Stock) {
    return new CreateStockOutput(stock.getId().getValue());
  }
}
