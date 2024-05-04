import { Stock } from './Stock';

export interface StockGateway {
  create(stock: Stock): Promise<Stock>;
}
