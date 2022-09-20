import { Role } from './Role';

export interface SessionBase {
    sessionToken: string;
    expiration: Date;
    role: Role;
}
