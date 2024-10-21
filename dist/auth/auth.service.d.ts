import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { DatabaseService } from 'src/database/database.service';
import { RepairmanService } from 'src/repairman/repairman.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from './decorators/roles.decorator';
interface ITokenPayload {
    id: string;
    role: Role;
}
export declare class AuthService {
    private readonly db;
    private readonly usersService;
    private readonly jwtService;
    private readonly adminsService;
    private readonly repairmanService;
    constructor(db: DatabaseService, usersService: UsersService, jwtService: JwtService, adminsService: AdminsService, repairmanService: RepairmanService);
    readonly ACCESS_TOKEN_EXPIRATION = "30m";
    readonly REFRESH_TOKEN_EXPIRATION = "30d";
    validateUser(hashedPassword: string, password: string): Promise<void>;
    userSignIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    userSignUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    adminSignIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    repairmanSignIn(signInDto: SignInDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    protected signTokens(payload: ITokenPayload): {
        access_token: string;
        refresh_token: string;
    };
    refresh(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
export {};
