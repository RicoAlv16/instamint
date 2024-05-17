import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApiErrorCode } from 'src/errorHandler/enum/apiErrorCode.enum';
import { MinterEntity } from 'src/shared/entities/minter.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissionGet = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permissionGet) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const minter: MinterEntity = request.minter;
    if (minter && minter.permission ) {
      return true;
    } else {
      throw new ForbiddenException('You do not have permission to perform this action', ApiErrorCode.PERMISSION_FORBIDDEN);
    }
  }
}
