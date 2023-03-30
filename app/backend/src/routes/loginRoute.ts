import express = require('express');
import AuthToken from '../middlewares/authToken';
import LoginFields from '../middlewares/checkLoginFields';
import Token from '../auth/token';
import LoginController from '../database/controllers/loginController';

import LoginService from '../database/service/loginService';
import User from '../database/models/userModel';

const router = express.Router();
const authentication = new AuthToken();

const loginService = new LoginService(User, new Token());
const loginController = new LoginController(loginService);
const validateFields = new LoginFields();

router.post('/', validateFields.checkLoginFields, loginController.loginUser);
router.get('/role', authentication.checkValidToken, loginController.getRole);

export default router;
