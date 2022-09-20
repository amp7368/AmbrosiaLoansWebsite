import { Role } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { ExceptionFactory } from '../base/ExceptionFactory';
import { Session } from './session/Session';
import { sessionStore } from './session/SessionStorage';
import { trimAuthorizationHeader } from './trimAuthorizationHeader';

const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!isArray(requiredRoles)) return true;
        const request = context.switchToHttp().getRequest();
        for (const role of requiredRoles) {
            if (role == Role.Public) continue;
            this.verifyRole(request, role);
        }
        return true;
    }

    verifyRole(request: unknown, role: Role) {
        const token = trimAuthorizationHeader('Bearer ', request);
        const session: Optional<Session> = sessionStore.getSession(token);
        if (!session) throw ExceptionFactory.instance.badSession();
        if (session.role !== role)
            throw ExceptionFactory.instance.unauthorized(
                'The session does not have valid permission to make this request'
            );
        return true;
    }
}
