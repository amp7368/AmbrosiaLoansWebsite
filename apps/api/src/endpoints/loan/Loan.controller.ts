import { LoanCreateRequestRuntime, okResponse } from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CollateralEntity } from '../../database/entity/collateral/Collateral.entity';
import { collateralQuery } from '../../database/entity/collateral/Collateral.query';
import { LoanEntity } from '../../database/entity/loans/Loan.entity';
import { loanQuery } from '../../database/entity/loans/Loan.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.loan.url)
export class LoanController extends ControllerBase {
    @Post('/create')
    async create(@Body() request: LoanCreateRequestRuntime) {
        if (!request || !request.loan) this.exception.badRequest(request);
        const collateral: CollateralEntity[] = await collateralQuery.findByIds(
            request.loan.collateral
        );
        const startDate: Date = request.loan.startDate ?? new Date();
        const entity: LoanEntity = LoanEntity.create({
            ...request.loan,
            collateral,
            payback: [],
            startDate,
        });
        const loan = await loanQuery.newloan(entity);
        return { loan, ...okResponse };
    }
    @Get('/list')
    async list(): Promise<LoanEntity[]> {
        return await loanQuery.list();
    }
}
