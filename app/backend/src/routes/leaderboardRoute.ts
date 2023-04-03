import express = require('express');
import LeaderboardService from '../database/service/leaderboardService';
import LeaderboardController from '../database/controllers/leaderboardController';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const router = express.Router();

router.get('/home', leaderboardController.getHomeTeams);

export default router;
