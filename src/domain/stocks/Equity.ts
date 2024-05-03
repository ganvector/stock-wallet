import { ValidationHandler } from '../validation/ValidationHandler.interface';
import { Stock } from './Stock';
import { STOCK_TYPE } from './StockType.enum';
import { StockID } from './StockID';
import { StockCode } from './StockCode';
import { Company } from '../companies/Company';
import { Objects } from '../../utils/Objects';
import { CompanyID } from '../companies/CompanyID';
import { StockValidator } from './StockValidator';

export class Equity extends Stock {
  protected readonly type: STOCK_TYPE = STOCK_TYPE.EQUITY;

  public validate(handler: ValidationHandler): void {
    new StockValidator(this, handler).validate();
  }

  public static create(
    company: Company,
    code: string,
    price: number,
    dividend: number,
  ): Equity {
    const id = StockID.create();
    const stockCode = StockCode.from(code);
    const companyId = company.getId();
    return new Equity(id, companyId, stockCode, price, dividend);
  }

  public static with(
    id: string,
    companyId: string,
    code: string,
    price: number,
    dividend: number,
  ): Equity {
    return new Equity(
      StockID.from(Objects.requireNonNull(id)),
      CompanyID.from(Objects.requireNonNull(companyId)),
      StockCode.from(Objects.requireNonNull(code)),
      Objects.requireNonNull(price),
      Objects.requireNonNull(dividend),
    );
  }
}
