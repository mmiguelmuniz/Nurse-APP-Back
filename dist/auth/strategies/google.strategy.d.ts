import type { Profile } from 'passport';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<{
        provider: string;
        providerId: string;
        name: string;
        email: string | undefined;
        pictureUrl: string | undefined;
        accessToken: string;
    }>;
}
export {};
//# sourceMappingURL=google.strategy.d.ts.map