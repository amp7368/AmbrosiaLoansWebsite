import {
    AmbrosiaException,
    AmbrosiaResponseOK,
    Loan,
    LoanCreateRequest,
    okResponse,
} from '@api/io-model';

import { API } from '../../api/API';
import { AppEntityQuery } from '../base/AppEntityQuery';
import { UpdatableState, UpdatedState } from '../base/UpdateState';
import { LoanState, loanStore } from './Loan.store';

export class LoanQuery extends AppEntityQuery<LoanState> {
    loans = new UpdatableState<Loan[]>(() => this.supplyLoans());
    private async supplyLoans(): Promise<UpdatedState<Loan[]>> {
        const response = await API.loanList();
        if (response.isOk) {
            return { newState: response.loans, isError: false };
        }
        return {
            newState: this.loans.getValue().newState,
            isError: true,
        };
    }
    async createLoan(
        request: LoanCreateRequest
    ): Promise<AmbrosiaResponseOK | AmbrosiaException> {
        const response = await API.loanCreate(request);
        if (!response.isOk) return response;
        this.loans.set((state: UpdatedState<Loan[]>) => ({
            newState: [...(state.newState ?? []), response.loan],
            isError: state.isError,
        }));
        return okResponse;
    }
}
export const loanQuery = new LoanQuery(loanStore);
