import { AggregationRoot } from '../AggregationRoot';
import { StockCode } from './StockCode';
import { StockID } from './StockID';
import { STOCK_TYPE } from './StockType.enum';
import { CompanyID } from '../companies/CompanyID';

export abstract class Stock extends AggregationRoot<StockID> {
  private readonly company: CompanyID;
  protected readonly type: STOCK_TYPE;
  private readonly code: StockCode;
  private price: number;
  private dividend: number;

  protected constructor(
    id: StockID,
    company: CompanyID,
    code: StockCode,
    price: number,
    dividend: number,
  ) {
    super(id);
    this.company = company;
    this.code = code;
    this.price = price;
    this.dividend = dividend;
  }

  public getCode(): StockCode {
    return this.code;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(value: number) {
    this.price = value;
  }

  public getType(): STOCK_TYPE {
    return this.type;
  }

  public getCompany(): CompanyID {
    return this.company;
  }

  public getDividend(): number {
    return this.dividend;
  }

  public setDividend(value: number) {
    this.dividend = value;
  }

  public getDividendYield(): number {
    return (this.dividend / this.price) * 100;
  }
}
