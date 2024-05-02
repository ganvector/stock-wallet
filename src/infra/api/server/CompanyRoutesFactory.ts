import { Router } from 'express';
import { CompanyAPI } from '../company/CompanyAPI.interface';

export abstract class CompanyRoutesFactory {
  private constructor() {}

  static build(companyController: CompanyAPI): Router {
    const router = Router();
    router.get('/:id', (req, res) =>
      companyController.getCompanyById(req, res),
    );
    router.post('/', (req, res) => companyController.createCompany(req, res));
    return router;
  }
}
