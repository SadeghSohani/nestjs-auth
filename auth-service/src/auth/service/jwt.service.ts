import { Injectable } from "@nestjs/common";
import { JwtService as Jwt } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../auth.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class JwtService {

    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>;
    
    private readonly jwt: Jwt;
    
    constructor(jwt: Jwt) {
        this.jwt = jwt;
    }

    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    public async validateUser(decode: any): Promise<Auth> {
        return this.repository.findOne({where: {email: decode.email}});
    }

    public generateToken(auth: Auth): string {
        return this.jwt.sign({ id: auth.id, email: auth.email });
    }

    public async isPasswordValid(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compareSync(password, userPassword);
    }

    public async encodePassword(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
    }

    public async verify(token: string): Promise<any> {
        try {
            return this.jwt.verify(token);
        } catch (err) {
            
        }
    }

}