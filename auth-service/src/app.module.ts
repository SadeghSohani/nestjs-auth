import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: process.env.MYSQLDB_LOCAL_PORT as unknown as number,
            database: process.env.DATABASE,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASS,
            entities: ['dist/**/*.entity.{ts,js}'],
            synchronize: true, // never true in production!
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
