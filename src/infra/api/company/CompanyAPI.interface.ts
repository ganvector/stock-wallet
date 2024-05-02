import { Request, Response } from 'express';

export interface CompanyAPI {
  createCompany(req: Request, res: Response): Promise<void>;
  getCompanyById(req: Request, res: Response): Promise<void>;
}
