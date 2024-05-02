import { IntegrationTest } from '../IntegrationTest';
import { DefaultCreateCompanyUseCase } from 'src/application/companies/create/DefaultCreateCompanyUseCase';
import { DefaultGetCompanyByIdUseCase } from 'src/application/companies/retrieve/get/DefaultGetCompanyByIdUseCase';
import { CompanyController } from 'src/infra/api/company/CompanyController';
import { Server } from 'src/infra/api/server';
import { CompanyMongoDBGateway } from 'src/infra/company/persistence/CompanyMongoDBGateway';

export abstract class E2ETest {
  private static server: Server;

  static async start() {
    if (E2ETest.server) return;
    await IntegrationTest.start();

    const companyGateway = new CompanyMongoDBGateway();
    const createCompanyUseCase = new DefaultCreateCompanyUseCase(
      companyGateway,
    );
    const getCompanyByIdUseCase = new DefaultGetCompanyByIdUseCase(
      companyGateway,
    );
    const companyController = new CompanyController(
      createCompanyUseCase,
      getCompanyByIdUseCase,
    );

    const server = new Server(companyController);

    E2ETest.server = server;
    server.listen();
  }
}
