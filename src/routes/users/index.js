import express from 'express';

import users from '../../controller/user.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/')
    .get(users.index)
    .post(auth.verifyToken, users.create);

export default routes;