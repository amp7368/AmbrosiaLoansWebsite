import { LoginRequest } from '@api/io-model';
import { ClientProfile } from '../../database/entity/client/Client.entity';
import { clientQuery } from '../../database/entity/client/Client.query';
import { Session } from '../../database/session/Session';
import { sessionStore } from '../../database/session/SessionStorage';

export class ClientService {
    static instance: ClientService;
}
ClientService.instance = new ClientService();
