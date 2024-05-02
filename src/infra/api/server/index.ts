import express, { Express } from 'express';
import { CompanyAPI } from '../company/CompanyAPI.interface';
import { CompanyRoutesFactory } from './CompanyRoutesFactory';
import morgan from 'morgan';

export class Server {
  private app: Express;

  constructor(private readonly companyController: CompanyAPI) {
    this.app = express();
    this.loadMiddleware();
    this.loadControllers();
  }

  private loadMiddleware() {
    this.app.use(
      morgan(
        ':date[iso] :method :url :status :res[content-length] - :response-time ms',
      ),
    );
    this.app.use(express.json());
  }

  private loadControllers(): void {
    this.app.use(
      '/api/company',
      CompanyRoutesFactory.build(this.companyController),
    );
  }

  listen(port: number = 3000) {
    this.app.listen(port, () =>
      console.info(`Listening on http://localhost:${port}`),
    );
  }
}
