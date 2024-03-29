import {
    Loan,
    LoanCreateRequestRuntime,
    LoanCreateResponse,
    LoanListResponse,
    okResponse,
    LoanSimple,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoanEntity } from '../../database/entity/loans/Loan.entity';
import { loanQuery } from '../../database/entity/loans/Loan.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.loan.url)
export class LoanController extends ControllerBase {
    @Post('/create')
    async create(
        @Body() request: LoanCreateRequestRuntime
    ): Promise<LoanCreateResponse> {
        if (!request || !request.loan) this.exception.badRequest(request);
        const loan: LoanEntity = await loanQuery.create(request.loan);
        return { loan: loanQuery.toSimple(loan), ...okResponse };
    }
    @Get('/list')
    async list(): Promise<LoanListResponse> {
        const entities: LoanEntity[] = await loanQuery.list();
        const loans: LoanSimple[] = entities.map(loanQuery.toSimple);
        return { loans, ...okResponse };
    }
}
