import { Request, Response } from 'express';
import Token from '../../auth/token';
import LoginService from '../service/loginService';

export default class LoginController {
  _service: LoginService;

  constructor(service: LoginService) {
    this._service = service;
  }

  loginUser = async (req: Request, res: Response) => {
    const result = await this._service.login(req.body);

    if (result.type) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token: result.token });
  };

  getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenValidate = new Token();
    try {
      const user = tokenValidate.authToken(authorization);
      return res.status(200).json({ role: user.role });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
