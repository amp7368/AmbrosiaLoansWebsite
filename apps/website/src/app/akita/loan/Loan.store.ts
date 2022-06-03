import { Loan } from '@api/io-model';
import { EntityState, StoreConfig } from '@datorama/akita';

import { AppEntityStore } from '../base/AppEntityStore';

export type LoanState = EntityState<Loan, string>;

@StoreConfig({ name: 'loan', idKey: 'uuid' })
export class LoanStore extends AppEntityStore<LoanState> {}
export const loanStore = new LoanStore();
