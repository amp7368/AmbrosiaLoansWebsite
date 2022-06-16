import { InvestEventType, LoanEventType } from '@api/io-model';
import {
    INestApplication,
    Module,
    NestApplicationOptions,
    ParseEnumPipe,
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD, NestFactory } from '@nestjs/core';
import { Multer } from 'multer';
import { RolesGuard } from './auth/Role';
import { initTypeOrmDbConnection } from './database/initDbConnection';
import { AuthModule } from './endpoints/auth/auth.module';
import { BaseModule } from './endpoints/Base.module';
import { MulterInit } from './MulterInit';

const PORT = 80;

@Module({
    imports: [AuthModule, BaseModule, MulterInit],
    providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
class AppModule {}

async function bootstrap() {
    await initTypeOrmDbConnection();

    const nestOptions: NestApplicationOptions = {
        cors: true,
    };
    const pipes: PipeTransform[] = [
        new ValidationPipe({
            // whitelist: true,
            enableDebugMessages: true,
            whitelist: true,
        }),
    ];
    const nestApp: INestApplication = await NestFactory.create(
        AppModule,
        nestOptions
    );

    await nestApp.useGlobalPipes(...pipes).listen(PORT, () => {
        console.log(`Nest server running on port ${PORT}`);
    });
}
bootstrap();
