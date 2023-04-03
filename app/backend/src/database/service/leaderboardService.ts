import sequelize from '../models';
import { IFullLeaderbordResult, ILeaderbordSqlResult } from '../../interfaces/leaderboardInterface';
import { homeLeaderBoardQuery } from '../../sequelizeMySqlQuerys/leaderboard';

export default class LeaderboardService {
  public getHomeTeams = async (): Promise<IFullLeaderbordResult[]> => {
    const [result] = await sequelize.query(homeLeaderBoardQuery) as ILeaderbordSqlResult[][];
    const fullLeaderbord = result.map((team) => {
      const efficiencyPercentage = ((team.totalPoints / (team.totalGames * 3))).toFixed(2);
      return { ...team, efficiency: efficiencyPercentage };
    });
    return fullLeaderbord;
  };
}
