import express from 'express';

import suratPerintah from '../../controller/suratPerintah.js';
import validasi from '../../helper/validasi.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/')
    .get(suratPerintah.getAllSuratPerintah)
    .post([auth.verifyToken, validasi.checkJabatanTU, validasi.checkSarprasNotInTask, validasi.checkTeknisiNotInTask], suratPerintah.createSuratPerintah);
    
routes.route('/:id')
    .get(suratPerintah.getSuratPerintahById)
    .patch([auth.verifyToken, validasi.checkJabatanWD2], suratPerintah.approveSuratPerintah);
    

export default routes;