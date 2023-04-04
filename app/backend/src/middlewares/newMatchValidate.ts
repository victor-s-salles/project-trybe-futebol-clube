import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/teamModel';
import Match from '../database/models/matchModel';
import MatchService from '../database/service/matchService';

export default class NewMatchValidate {
  checkValid = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = req.body;
    if (homeTeamGoals === undefined || awayTeamGoals === undefined
      || homeTeamId === undefined || awayTeamId === undefined) {
      return res.status(400)
        .json({ message: 'All fields must be filled' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const matchService = new MatchService(Match, Team);
    const homeTeam = await matchService.getById(Number(homeTeamId));
    const awayTeam = await matchService.getById(Number(awayTeamId));
    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
