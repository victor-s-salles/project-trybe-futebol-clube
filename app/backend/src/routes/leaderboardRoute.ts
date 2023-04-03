import express = require('express');
import LeaderboardService from '../database/service/leaderboardService';
import LeaderboardController from '../database/controllers/leaderboardController';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const router = express.Router();

router.get('/home', leaderboardController.getHomeTeams);
router.get('/away', leaderboardController.getAwayTeams);

export default router;
