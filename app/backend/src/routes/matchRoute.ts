import express = require('express');
import Team from '../database/models/teamModel';
import MatchController from '../database/controllers/matchController';
import MatchService from '../database/service/matchService';
import Match from '../database/models/matchModel';

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);

const router = express.Router();

router.get('/', matchController.getAll);

export default router;
