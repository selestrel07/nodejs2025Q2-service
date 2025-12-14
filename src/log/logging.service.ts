import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { tap, Observable, catchError } from "rxjs";

@Injectable()
export class LoggingService implements NestInterceptor {
  private readonly logger = new Logger(LoggingService.name, {timestamp: true});
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    this.logger.log(this.generateLogString(request));

    return next.handle().pipe(
      tap((body) =>
        {
          this.logger.log(this.generateLogString(null, {
            statusCode: response.statusCode,
            body,
          }));
        }
      ),
      catchError((error) => {
        const status = error instanceof HttpException ? error.getStatus() : 500;
        const response = error instanceof HttpException ? error.getResponse() : '';
        this.logger.warn(this.generateLogString(null, null, {
          status,
          response,
        }));
        throw error;
      })
    )
  }

  private generateLogString(request: any, response: any = null, error: any = null) {
    if (request) {
      return `${request.method} request to ${request.path} Headers: ${JSON.stringify(request.headers)} Query parameters: ${JSON.stringify(request.query)} Body: ${JSON.stringify(request.body)}`;
    } else if (response) {
      return `Status: ${response.statusCode} Body: ${JSON.stringify(response.body)}`;
    }
    return `${error.status} - ${error.response}`;
  }
}