import express from 'express';
import auth from '../controller/auth.js';

const routes = express.Router();

routes.route('/auth')
    .post(auth.authenticate)
    ;

export default routes;