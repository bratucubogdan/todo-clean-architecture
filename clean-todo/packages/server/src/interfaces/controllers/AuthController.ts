import { Request, Response } from 'express';
import { AuthService } from '../../application/services/AuthService.js';

export class AuthController {
  constructor(private auth: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body as any;
    const result = await this.auth.register(email, name, password);
    res.json({ token: result.token, user: { id: result.user.id, email: result.user.props.email, name: result.user.props.name } });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as any;
    const result = await this.auth.login(email, password);
    res.json({ token: result.token, user: { id: result.user.id, email: result.user.props.email, name: result.user.props.name } });
  };
}
