import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name, {timestamp: true});
  use(req: any, res: any, next: (error?: Error | any) => void) {
    let responseBody: any;

    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      responseBody = body;
      return originalSend(body);
    };
    this.logger.log(this.generateLogString(req));
    res.on('finish', () => this.logger.log(this.generateLogString(null, {...res, body: responseBody})));

    next();
  }

  private generateLogString(request: any, response: any = null, error: any = null) {
    if (request) {
      return `${request.method} request to ${request.originalUrl} Headers: ${JSON.stringify(request.headers)} Body: ${JSON.stringify(request.body)}`;
    } else if (response) {
      return `Status: ${response.statusCode} Body: ${response.body}`;
    }
    return `${error.status} - ${error.response}`;
  }
}