import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PerfilCompletoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.perfilCompleto) {
      throw new ForbiddenException(
        'Complete seu perfil para continuar',
      );
    }

    return true;
  }
}
