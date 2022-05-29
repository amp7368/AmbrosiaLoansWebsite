import { LoanPaybackRequestRuntime, okResponse } from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { LoanEntity } from '../../database/entity/loans/Loan.entity';
import { loanQuery } from '../../database/entity/loans/Loan.query';
import { LoanPaybackEntity } from '../../database/entity/loans/payback/LoanPayback.entity';
import { loanPaybackQuery } from '../../database/entity/loans/payback/LoanPayback.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.loan.payback.url)
export class LoanPaybackController extends ControllerBase {
    @Post('/create')
    async create(@Body() request: LoanPaybackRequestRuntime) {
        if (!request || !request.payback) this.exception.badRequest(request);
        const paybackDate: Date = request.payback.paybackDate ?? new Date();
        const loan: LoanEntity = await loanQuery.findByIds(
            request.payback.loan
        );
        const entity: LoanPaybackEntity = LoanPaybackEntity.create({
            ...request.payback,
            loan,
            paybackDate,
        });
        const payback: LoanPaybackEntity = await loanPaybackQuery.newPayback(
            entity
        );
        return { payback, ...okResponse };
    }
    @Get('/list')
    async list(): Promise<LoanPaybackEntity[]> {
        return await loanPaybackQuery.list();
    }
}
