export const homeLeaderBoardQuery = `
    SELECT tea.team_name AS name, 
    SUM(CASE WHEN mat.home_team_goals > mat.away_team_goals THEN 3 
    WHEN mat.home_team_goals = mat.away_team_goals THEN 1 ELSE 0 END) AS totalPoints, 
    COUNT(*) AS totalGames, 
    SUM(IF(mat.home_team_goals > mat.away_team_goals, 1, 0)) AS totalVictories,
    SUM(IF(mat.home_team_goals = mat.away_team_goals, 1, 0)) AS totalDraws,
    SUM(IF(mat.home_team_goals < mat.away_team_goals, 1, 0)) AS totalLosses,
    SUM(mat.home_team_goals) AS goalsFavor, 
    SUM(mat.away_team_goals) AS goalsOwn,
    (SUM(mat.home_team_goals) - SUM(mat.away_team_goals)) AS goalsBalance
    FROM teams AS tea JOIN matches AS mat ON mat.home_team_id = tea.id 
    AND mat.in_progress IS FALSE GROUP BY name 
    ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;    
`;

export const awayLeaderBoardQuery = '';
