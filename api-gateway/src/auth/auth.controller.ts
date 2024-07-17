import { Body, Controller, Get, Inject, Post, Put, Req, UseGuards } from '@nestjs/common';
import { 
    RegisterResponse, RegisterRequest, 
    LoginRequest, LoginResponse
} from './auth.pb';
import { AuthService} from './auth.service'
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController  {

    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    private async register(@Body() body: RegisterRequest): Promise<RegisterResponse> {
        return this.service.register(body);
    }

    @Put('login')
    private async login(@Body() body: LoginRequest): Promise<LoginResponse> { 
        return this.service.login(body);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    private async profile(@Req() req: any) {
        return {userId: req.user};
    }

}
