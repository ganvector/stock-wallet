import { CreateStockUseCase } from './CreateStockUseCase';
import { CreateStockCommand } from './CreateStockCommand';
import { Either } from '../../utils/monads/Either';
import { Notification } from '../../domain/validation/handlers/Notification';
import { CreateStockOutput } from './CreateStockOutput';
import { CompanyGateway } from '../../domain/companies/CompanyGateway.interface';
import { StockGateway } from '../../domain/stocks/StockGateway.interface';
import { CompanyID } from '../../domain/companies/CompanyID';
import { MonadsAPI } from '../../utils/monads';
import { NotFoundException } from '../../domain/exceptions/NotFoundException';
import { Equity } from '../../domain/stocks/Equity';
import { Objects } from '../../utils/Objects';

export class DefaultCreateStockUseCase extends CreateStockUseCase {
  private readonly companyGateway: CompanyGateway;
  private readonly stockGateway: StockGateway;

  constructor(companyGateway: CompanyGateway, stockGateway: StockGateway) {
    super();
    this.companyGateway = Objects.requireNonNull(companyGateway);
    this.stockGateway = Objects.requireNonNull(stockGateway);
  }

  async execute(
    input: CreateStockCommand,
  ): Promise<Either<Notification, CreateStockOutput>> {
    const notification = Notification.create();
    const companyId = CompanyID.from(input.companyId);
    const company = await this.companyGateway.findById(companyId);
    if (!company) {
      notification.append(NotFoundException.fromId(companyId));
      return MonadsAPI.Left(notification);
    }
    const equity = Equity.create(
      company,
      input.code,
      input.price,
      input.dividend,
    );
    equity.validate(notification);
    return notification.hasError()
      ? MonadsAPI.Left(notification)
      : this.create(equity);
  }

  private async create(
    equity: Equity,
  ): Promise<Either<Notification, CreateStockOutput>> {
    try {
      const createdEquity = await this.stockGateway.create(equity);
      return MonadsAPI.Right(CreateStockOutput.from(createdEquity));
    } catch (error: any) {
      return MonadsAPI.Left(Notification.create(error));
    }
  }
}
