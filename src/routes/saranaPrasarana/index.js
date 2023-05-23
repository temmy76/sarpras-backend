import express from 'express';

import saranaPrasarana from '../../controller/saranaPrasarana.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/')
    .get(saranaPrasarana.getAllSaranaPrasarana)
    .post(auth.verifyToken, saranaPrasarana.createSaranaPrasarana);

export default routes;