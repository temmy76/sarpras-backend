import express from 'express';

import suratPerintah from '../../controller/suratPerintah.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/')
    .get(suratPerintah.getAllSuratPerintah)
    .post([auth.verifyToken, suratPerintah.checkJabatanTU, suratPerintah.checkSarprasNotInTask, suratPerintah.checkTeknisiNotInTask], suratPerintah.createSuratPerintah);
    
routes.route('/:id')
    .patch([auth.verifyToken, suratPerintah.checkJabatanWD2], suratPerintah.approveSuratPerintah);
    

export default routes;