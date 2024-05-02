import { CreateCompanyUseCase } from 'src/application/companies/create/CreateCompanyUseCase';
import { GetCompanyByIdUseCase } from 'src/application/companies/retrieve/get/GetCompanyByIdUseCase';
import { CreateCompanyCommand } from 'src/application/companies/create/CreateCompanyCommand';
import { Notification } from 'src/domain/validation/handlers/Notification';
import { CreateCompanyOutput } from 'src/application/companies/create/CreateCompanyOutput';
import { CompanyAPI } from './CompanyAPI.interface';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { Request, Response } from 'express';
import { Objects } from 'src/utils/Objects';

export class CompanyController implements CompanyAPI {
  private readonly createCompanyUseCase: CreateCompanyUseCase;
  private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase;

  constructor(
    createCompanyUseCase: CreateCompanyUseCase,
    getCompanyByIdUseCase: GetCompanyByIdUseCase,
  ) {
    Objects.requireNonNull(createCompanyUseCase);
    Objects.requireNonNull(getCompanyByIdUseCase);

    this.createCompanyUseCase = createCompanyUseCase;
    this.getCompanyByIdUseCase = getCompanyByIdUseCase;
  }

  async createCompany(req: Request, res: Response) {
    const body = req.body;
    const input = CreateCompanyCommand.create(body.name, body.cnpj);

    const onSuccess = (right: CreateCompanyOutput) =>
      res.status(201).send(right);
    const onFail = (left: Notification) => res.status(400).send(left);

    const result = await this.createCompanyUseCase.execute(input);

    result.fold(onFail, onSuccess);
  }

  async getCompanyById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const result = await this.getCompanyByIdUseCase.execute(id);
      res.status(200).send(result);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        res.status(404).send(error.message);
        return;
      }
      res.status(500).send(error.message);
    }
  }
}
