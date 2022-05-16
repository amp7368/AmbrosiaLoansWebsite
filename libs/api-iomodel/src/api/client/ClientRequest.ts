import { AuthorizedRequest } from '../AuthorizedRequest';
import { ClientProfileBase } from './ClientResponse';

export type ClientListRequest = AuthorizedRequest;
export type ClientCreateRequest = AuthorizedRequest & {
    client: Omit<ClientProfileBase, 'uuid'>;
};
