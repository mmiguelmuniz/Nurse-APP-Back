import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    googleLogin(): void;
    googleCallback(req: any, res: Response): Promise<void>;
    refresh(req: any): Promise<any>;
    me(req: any): any;
}
//# sourceMappingURL=auth.controller.d.ts.map