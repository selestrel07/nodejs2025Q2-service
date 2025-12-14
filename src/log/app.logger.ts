import { ConsoleLogger, Injectable, LogLevel } from "@nestjs/common";
import { join } from 'node:path';
import { mkdirSync, appendFileSync } from "node:fs";

@Injectable()
export class AppLogger extends ConsoleLogger {
  private logFilePath: string;
  private errorLogFilePath: string;
  private maxFileSize: number;

  constructor(context?: string, logLevels?: LogLevel[]) {
    super(context, { logLevels });
    this.logFilePath = join(process.cwd(), 'logs', `app-${new Date().toISOString()}.log`);
    this.errorLogFilePath = join(process.cwd(), 'logs', `app-${new Date().toISOString()}-error.log`);
    this.maxFileSize = parseInt(process.env.MAX_LOG_SIZE ?? '50');
    mkdirSync(join(process.cwd(), 'logs'), { recursive: true });
  }

  private writeToFile(filePath, message: unknown) {
    const timestamp = new Date().toISOString();
    appendFileSync(filePath, `[${timestamp}] ${message}\n`);
  }

  log(message: unknown, context?: unknown): void {
    super.log(message, context);
    this.writeToFile(this.logFilePath, message);
  }

  warn(message: unknown, context?: unknown): void {
    super.warn(message, context);
    this.writeToFile(this.logFilePath, message);
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    super.error(message, stack, context);
    this.writeToFile(this.errorLogFilePath, message);
    this.writeToFile(this.logFilePath, message);
  }
}