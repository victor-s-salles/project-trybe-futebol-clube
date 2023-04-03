import { Request, RequestHandler, Response } from 'express';
import LeaderboardService from '../service/leaderboardService';

export default class LeaderboardController {
  _service: LeaderboardService;

  constructor(service: LeaderboardService) {
    this._service = service;
  }

  getHomeTeams: RequestHandler = async (req: Request, res: Response) => {
    const result = await this._service.getHomeTeams();
    return res.status(200).json(result);
  };

  getAwayTeams: RequestHandler = async (req: Request, res: Response) => {
    const result = await this._service.getAwayTeams();
    return res.status(200).json(result);
  };
}
