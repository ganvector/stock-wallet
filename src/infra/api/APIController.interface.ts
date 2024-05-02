import { Request, Response } from 'express';

export interface HttpContract {
  req: Request;
  res: Response;
}
