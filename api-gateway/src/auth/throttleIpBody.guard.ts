import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Request } from 'express';

@Injectable()
export class ThrottleIpBodyGuard extends ThrottlerGuard {

    getTracker(req: Request): any {
        return req.ip + req.body.username;
    }
}
