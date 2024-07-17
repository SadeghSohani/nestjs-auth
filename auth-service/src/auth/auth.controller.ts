import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './auth.dto';
import { RegisterResponse, LoginResponse, ValidateResponse, AuthServiceName } from './auth.pb';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {

    @Inject(AuthService)
    private readonly service: AuthService;

    @GrpcMethod(AuthServiceName, 'Register')
    private register(payload: RegisterRequestDto): Promise<RegisterResponse> {
        console.log("Registering...");
        return this.service.register(payload);
    }

    @GrpcMethod(AuthServiceName, 'Login')
    private login(payload: LoginRequestDto): Promise<LoginResponse> {
        console.log("Login...");
        return this.service.login(payload);
    }

    @GrpcMethod(AuthServiceName, 'Validate')
    private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
        console.log("Validating...");
        return this.service.validate(payload);
    }

}
