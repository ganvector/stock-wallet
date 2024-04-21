import winston from 'winston';
import { randomUUID } from 'crypto';

export class Logger {
  private logger: winston.Logger;

  private readonly id: string;

  private constructor() {
    this.id = randomUUID().substring(0, 8);
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.printf(
          ({ level, message, id }) => `[${id}] ${level}: ${message}`,
        ),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  public debug(...params: any[]): void {
    this.logger.debug(params.join(' '), { id: this.id });
  }

  public verbose(...params: any[]): void {
    this.logger.verbose(params.join(' '), { id: this.id });
  }

  public info(...params: any[]): void {
    this.logger.info(params.join(' '), { id: this.id });
  }

  public warn(...params: any[]): void {
    this.logger.warn(params.join(' '), { id: this.id });
  }

  public error(...params: any[]): void {
    this.logger.error(params.join(' '), { id: this.id });
  }

  static create(): Logger {
    return new Logger();
  }
}
