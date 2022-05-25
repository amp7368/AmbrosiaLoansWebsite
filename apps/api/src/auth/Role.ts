import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { sessionStore } from '../database/session/SessionStorage';
import { ExceptionFactory } from '../endpoints/base/ExceptionFactory';

export enum Role {
    Public = 'public',
    Client = 'client',
    Admin = 'admin',
}

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
            switch (role) {
                case Role.Admin:
                    this.verifyAdmin(request);
                    continue;
                case Role.Client:
                    return false;
                case Role.Public:
                    continue;
            }
        }
        return true;
    }

    verifyAdmin(request: any) {
        const auth: string = request.headers.authorization;
        const starting = 'Bearer ';
        if (!auth || !auth.startsWith(starting)) {
            ExceptionFactory.instance.badRequest(auth);
            return false;
        }
        const token = auth.substring(starting.length);
        this.validateSession(token);
        return true;
    }
    validateSession(sessionToken: string) {
        const isValid = sessionStore.isSessionValid(sessionToken);
        if (!isValid) throw ExceptionFactory.instance.badSession();
    }
}
