import {
    LoanEventCreateRequestRuntime,
    LoanEventCreateResponse,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Post } from '@nestjs/common';
import { loanEventQuery } from '../loan/LoanEvent.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.loanEvent.url)
export class InvestEventController extends ControllerBase {
    @Post('/create')
    async create(
        @Body() request: LoanEventCreateRequestRuntime
    ): Promise<LoanEventCreateResponse> {
        const entity = await loanEventQuery.create(request);
        const event = loanEventQuery.toSimple(entity);
        return { event, ...okResponse };
    }
}
