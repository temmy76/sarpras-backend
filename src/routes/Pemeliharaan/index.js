import express from 'express';


import validasi from '../../helper/validasi.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/jadwal')
    .get();

routes.route('/hasil')
    .get()
    .post([auth.verifyToken, validasi.checkJabatanTeknisi], );


export default routes;