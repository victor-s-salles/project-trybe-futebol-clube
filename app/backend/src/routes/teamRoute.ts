import express = require('express');
import TeamController from '../database/controllers/teamController';

import TeamService from '../database/service/teamService';
import Team from '../database/models/teamModel';

const router = express.Router();

const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAll);

router.get('/:id', teamController.getByid);

export default router;
