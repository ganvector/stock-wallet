import { Stock } from './Stock';
import { ValidationHandler } from '../validation/ValidationHandler.interface';
import { Validator } from '../validation/Validator';
import { Objects } from '../../utils/Objects';
import { DomainError } from '../validation/Error';

export class StockValidator extends Validator {
  private static CODE_MAX_LENGTH = 6;
  private static CODE_MIN_LENGTH = 5;
  private readonly stock: Stock;

  constructor(stock: Stock, handler: ValidationHandler) {
    super(handler);
    this.stock = stock;
  }

  public validate(): void {
    this.checkStockCode();
    this.checkStockPrice();
    this.checkStockDividend();
  }

  private checkStockCode() {
    const code = this.stock.getCode();
    if (
      Objects.isNull(code) ||
      Objects.isUndefined(code) ||
      Objects.isNull(code.getValue()) ||
      Objects.isUndefined(code.getValue())
    ) {
      this.getHandler().append(new DomainError("'code' não deve ser nulo"));
      return;
    }
    if (!code.getValue().trim()) {
      this.getHandler().append(new DomainError("'code' não deve ser vazio"));
    }
    const codeSize = code.getValue().trim().length;
    if (
      codeSize > StockValidator.CODE_MAX_LENGTH ||
      codeSize < StockValidator.CODE_MIN_LENGTH
    ) {
      this.getHandler().append(
        new DomainError("'code' deve conter entre 5 e 6 caracteres"),
      );
    }
  }

  private checkStockPrice() {
    const price = this.stock.getPrice();
    if (Objects.isNull(price) || Objects.isUndefined(price)) {
      this.getHandler().append(new DomainError("'price' não deve ser nulo"));
      return;
    }
    if (Number.isNaN(Number(price))) {
      this.getHandler().append(
        new DomainError("'price' deve ser do tipo numérico"),
      );
      return;
    }
    if (price <= 0) {
      this.getHandler().append(
        new DomainError("'price' deve ser maior que zero"),
      );
    }
  }

  private checkStockDividend() {
    const dividend = this.stock.getDividend();
    if (Objects.isNull(dividend) || Objects.isUndefined(dividend)) {
      this.getHandler().append(new DomainError("'dividend' não deve ser nulo"));
      return;
    }
    if (Number.isNaN(Number(dividend))) {
      this.getHandler().append(
        new DomainError("'dividend' deve ser do tipo numérico"),
      );
      return;
    }
    if (dividend < 0) {
      this.getHandler().append(
        new DomainError("'dividend' não deve ser menor que zero"),
      );
    }
  }
}
