import Match from '../database/models/matchModel';

export default interface INewMatch {
  homeTeamId: number
  awayTeamId: number
  homeTeamGoals: number
  awayTeamGoals: number
}

interface teamName {
  teamName: string
}
export interface IMatches extends Match {
  homeTeam: teamName;
  awayTeam: teamName
}
