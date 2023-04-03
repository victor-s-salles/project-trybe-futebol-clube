export interface ILeaderbordSqlResult {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,

}

export interface IFullLeaderbordResult extends ILeaderbordSqlResult {
  efficiency: string,
}
