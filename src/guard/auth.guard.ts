import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log(authHeader, request);
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missed');
    }

    const [type, token] = authHeader.split(' ');
    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header scheme');
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}