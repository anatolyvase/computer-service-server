import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateAccountPasswordDto } from 'src/users/dto/update-user-account.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    userSignIn(signInDto: SignInDto, response: Response): Promise<{
        access_token: string;
    }>;
    userSignUp(createUserDto: CreateUserDto, response: Response): Promise<{
        access_token: string;
    }>;
    updatePassword(passwordDto: UpdateAccountPasswordDto, user: any): Promise<{
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
        orders: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            addressId: string;
            repairmanId: string | null;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        refreshSessions: {
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    adminSignIn(signInDto: SignInDto, response: Response): Promise<{
        access_token: string;
    }>;
    repairmanSignIn(signInDto: SignInDto, response: Response): Promise<{
        access_token: string;
    }>;
    refresh(refreshToken: string, response: Response): Promise<{
        access_token: string;
    }>;
    logout(response: Response): Promise<string>;
    private setRefreshTokenCookie;
}
