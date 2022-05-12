import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { AuthService } from './endpoints/user/auth/auth.service';

@Module({
    imports: [],
    providers: [AuthService],
})
export class TempInitDatabase {
    constructor(private authService: AuthService) {}
}
