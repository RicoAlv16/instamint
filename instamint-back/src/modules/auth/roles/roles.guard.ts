import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler()
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new HttpException(
        'User not found in request',
        HttpStatus.UNAUTHORIZED
      );
    }

    const hasRole = requiredRoles.some(role => user.roles?.includes(role));
    if (!hasRole) {
      throw new HttpException(
        'Forbidden: You do not have the required permissions',
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }
}
