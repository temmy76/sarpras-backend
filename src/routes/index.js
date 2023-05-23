import express from 'express';
import response from '../helper/response.js';

import auth from './auth.js';
import users from './users/index.js';
import suratPerintah from './suratPerintah/index.js';
import saranaPrasarana from './saranaPrasarana/index.js';
import jadwalInspeksi from './Inspeksi/index.js';

const routes = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', auth);
routes.use('/users', users);
routes.use('/surat-perintah', suratPerintah);
routes.use('/sarana-prasarana', saranaPrasarana);
routes.use('/inspeksi', jadwalInspeksi);

routes.get('/', (req, res) => {
    res.status(200).json({ message : "OK" });
});

routes.use((req,res) => {
    response.sendNotFound(res);
})

export default routes;