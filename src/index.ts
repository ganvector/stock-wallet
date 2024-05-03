import { DefaultCreateCompanyUseCase } from './application/companies/create/DefaultCreateCompanyUseCase';
import { DefaultGetCompanyByIdUseCase } from './application/companies/retrieve/get/DefaultGetCompanyByIdUseCase';
import { CompanyController } from './infra/api/company/CompanyController';
import { Server } from './infra/api/server';
import { CompanyMongoDBGateway } from './infra/company/persistence/CompanyMongoDBGateway';
import { MongoDB } from './infra/database/MongoDB';
import { CONFIG } from './infra/config';

async function bootstrap() {
  await MongoDB.connect(CONFIG.MONGODB_URI);

  const companyGateway = new CompanyMongoDBGateway();
  const createCompanyUseCase = new DefaultCreateCompanyUseCase(companyGateway);
  const getCompanyByIdUseCase = new DefaultGetCompanyByIdUseCase(
    companyGateway,
  );
  const companyController = new CompanyController(
    createCompanyUseCase,
    getCompanyByIdUseCase,
  );

  const server = new Server(companyController);

  server.listen();
}

bootstrap();
