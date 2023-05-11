import express from 'express';

import users from '../../controller/user.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/')
    .get(auth.verifyToken, users.index)
    .post(users.create);

export default routes;