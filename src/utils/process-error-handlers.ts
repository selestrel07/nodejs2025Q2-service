import { AppLogger } from "src/log/app.logger";

export const useProcessErrorHandlers = (logger: AppLogger) => {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', error.stack, 'process.on(uncaughtException)');

    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) =>
    logger.error('Unhandled Promise Rejection', reason instanceof Error ? reason.stack : String(reason), 'process.on(unhandledRejection)'));
}