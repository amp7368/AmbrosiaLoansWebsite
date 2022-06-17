import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { BrokerEntity } from './Broker.entity';

export class BrokerQuery extends AmbrosiaQuery<BrokerEntity> {}

export const brokerQuery = new BrokerQuery(BrokerEntity, 'broker');
