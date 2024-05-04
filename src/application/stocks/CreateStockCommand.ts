export class CreateStockCommand {
  public readonly code: string;
  public readonly companyId: string;
  public readonly price: number;
  public readonly dividend: number;

  private constructor(
    code: string,
    companyId: string,
    price: number,
    dividend: number,
  ) {
    this.code = code;
    this.companyId = companyId;
    this.price = price;
    this.dividend = dividend;
  }

  public static with(
    code: string,
    companyId: string,
    price: number,
    dividend: number,
  ): CreateStockCommand {
    return new CreateStockCommand(code, companyId, price, dividend);
  }
}
