import {
    INestApplication,
    Module,
    NestApplicationOptions,
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD, NestFactory } from '@nestjs/core';

import { AuthModule } from './app/auth/auth.module';
import { BaseModule } from './app/Base.module';
import { initTypeOrmDbConnection } from './app/initDbConnection';
import { RolesGuard } from './app/auth/Role';
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
