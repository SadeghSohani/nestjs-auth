import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthServiceName, protobufPackage } from './auth.pb';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: AuthServiceName,
                transport: Transport.GRPC,
                options: {
                    url: process.env.GRPC_URL,
                    package: protobufPackage,
                    protoPath: 'node_modules/grpc-proto/proto/auth.proto',
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
