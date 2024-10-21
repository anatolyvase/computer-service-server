export declare class UserProfileDto {
    phoneNumber: string;
    firstName: string;
    lastName: string;
}
declare const UpdateUserProfileDto_base: import("@nestjs/mapped-types").MappedType<Partial<UserProfileDto>>;
export declare class UpdateUserProfileDto extends UpdateUserProfileDto_base {
}
export {};
