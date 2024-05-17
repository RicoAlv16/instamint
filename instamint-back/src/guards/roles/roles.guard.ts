import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApiErrorCode } from 'src/errorHandler/enum/apiErrorCode.enum';
import { MinterEntity } from 'src/shared/entities/minter.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    } 
    const request = context.switchToHttp().getRequest();
    const minter: MinterEntity = request.minter;
    if (minter && minter.role) {
      return true;
    }  else {
      throw new ForbiddenException('You do not have role to perform this action', ApiErrorCode.ROLE_FORBIDDEN);
    }
  }
}
