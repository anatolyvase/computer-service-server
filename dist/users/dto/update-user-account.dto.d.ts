declare class AccountPasswordDto {
    password: string;
    newPassword: string;
}
declare const UpdateAccountPasswordDto_base: import("@nestjs/mapped-types").MappedType<Partial<AccountPasswordDto>>;
export declare class UpdateAccountPasswordDto extends UpdateAccountPasswordDto_base {
}
export {};
