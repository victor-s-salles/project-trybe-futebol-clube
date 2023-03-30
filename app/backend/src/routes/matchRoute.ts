import express = require('express');
import AuthToken from '../middlewares/authToken';
import Team from '../database/models/teamModel';
import MatchController from '../database/controllers/matchController';
import MatchService from '../database/service/matchService';
import Match from '../database/models/matchModel';

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);
const authentication = new AuthToken();
const router = express.Router();

router.get('/', matchController.getAll);
router.patch('/:id/finish', authentication.checkValidToken, matchController.finishMatch);
// router.patch('/:id')

export default router;
