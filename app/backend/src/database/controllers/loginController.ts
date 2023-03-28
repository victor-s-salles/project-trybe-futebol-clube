import { Request, Response } from 'express';
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
}
