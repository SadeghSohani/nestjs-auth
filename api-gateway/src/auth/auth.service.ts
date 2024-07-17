import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { from } from 'rxjs';
import { AuthServiceClientImpl, AuthServiceName, ValidateResponse, RegisterResponse, 
    RegisterRequest, LoginResponse, LoginRequest
} from './auth.pb';

@Injectable()
export class AuthService { // implements OnModuleInit
    private svc: AuthServiceClientImpl;

    constructor(@Inject(AuthServiceName) private readonly client: ClientGrpc) {
        this.svc = this.client.getService<AuthServiceClientImpl>(AuthServiceName);
    }

    public async register(body: RegisterRequest): Promise<RegisterResponse> {
        return this.svc.Register(body);
    }

    public async login(body: LoginRequest): Promise<LoginResponse> {
        return this.svc.Login(body);
    }

    public async validate(token: string): Promise<ValidateResponse> {
        const observable = from(this.svc.Validate({token}))
        const value: ValidateResponse = await lastValueFrom(observable);
        return value;
    }

}