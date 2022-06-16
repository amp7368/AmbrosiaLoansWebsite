import {
    Investment,
    InvestmentCreateRequest,
    InvestmentCreateRequestRuntime,
    InvestmentCreateResponse,
    InvestmentListResponse,
    InvestmentSimple,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvestmentEntity } from '../../database/entity/investment/Investment.entity';
import { investmentQuery } from '../../database/entity/investment/Investment.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.investment.url)
export class InvestmentController extends ControllerBase {
    @Post('/create')
    async create(
        @Body() request: InvestmentCreateRequestRuntime
    ): Promise<InvestmentCreateResponse> {
        if (!request || !request.investment) this.exception.badRequest(request);
        const investment: InvestmentEntity = await investmentQuery.create(
            request.investment
        );
        return {
            investment: investmentQuery.toSimple(investment),
            ...okResponse,
        };
    }
    @Get('/list')
    async list(): Promise<InvestmentListResponse> {
        const entities: InvestmentEntity[] = await investmentQuery.list();
        const investments: InvestmentSimple[] = entities.map(
            investmentQuery.toSimple
        );
        return { investments, ...okResponse };
    }
}
