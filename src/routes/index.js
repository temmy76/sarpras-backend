import express from 'express';

import auth from './auth.js';
import users from './users/index.js';
import response from '../helper/response.js';


const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', auth);
routes.use('/users', users);

routes.get('/', (req, res) => {
    res.status(200).json({ message : "OK" });
});

routes.use((req,res) => {
    response.sendNotFound(res);
})

export default routes;