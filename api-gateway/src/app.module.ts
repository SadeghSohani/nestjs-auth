import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottleIpBodyGuard } from './auth/throttleIpBody.guard';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: process.env.THROTTLE_TTL as unknown as number,
            limit: process.env.THROTTLE_LIMIT as unknown as number,
        }]),
        ConfigModule.forRoot(),
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottleIpBodyGuard
        }
    ],
})
export class AppModule { }
