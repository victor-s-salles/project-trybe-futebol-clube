import express = require('express');
import NewMatchValidate from '../middlewares/newMatchValidate';
import AuthToken from '../middlewares/authToken';
import Team from '../database/models/teamModel';
import MatchController from '../database/controllers/matchController';
import MatchService from '../database/service/matchService';
import Match from '../database/models/matchModel';
import CheckUpdateMatchFields from '../middlewares/checkUpdateMatchFields';

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);
const authentication = new AuthToken();
const checkUpdateMatchFields = new CheckUpdateMatchFields();
const newMatchValidate = new NewMatchValidate();
const router = express.Router();

router.get('/', matchController.getAll);
router.patch('/:id/finish', authentication.checkValidToken, matchController.finishMatch);
router.patch(
  '/:id',
  authentication.checkValidToken,
  checkUpdateMatchFields.checkFields,
  matchController.updateMathGoals,
);
router.post(
  '/',
  authentication.checkValidToken,
  newMatchValidate.checkValid,
  matchController.insertNewMatch,
);
export default router;
