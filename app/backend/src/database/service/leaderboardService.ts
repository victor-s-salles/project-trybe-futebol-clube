import sequelize from '../models';
import { IFullLeaderbordResult, ILeaderbordSqlResult } from '../../interfaces/leaderboardInterface';
import { allLeaderBoardQuery, awayLeaderBoardQuery,
  homeLeaderBoardQuery } from '../../sequelizeMySqlQuerys/leaderboard';

export default class LeaderboardService {
  private getResultLeaderboard = async (query:string):Promise<IFullLeaderbordResult[]> => {
    const [result] = await sequelize.query(query) as ILeaderbordSqlResult[][];
    const fullLeaderbord = result.map((team) => {
      const efficiencyPercentage = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency: efficiencyPercentage };
    });
    return fullLeaderbord;
  };

  public getHomeTeams = async (): Promise<IFullLeaderbordResult[]> => this
    .getResultLeaderboard(homeLeaderBoardQuery);

  public getAwayTeams = async (): Promise<IFullLeaderbordResult[]> => this
    .getResultLeaderboard(awayLeaderBoardQuery);

  public getAllTeams = async (): Promise<IFullLeaderbordResult[]> => this
    .getResultLeaderboard(allLeaderBoardQuery);
}
