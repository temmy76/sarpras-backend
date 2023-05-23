import express from 'express';

import jadwalInspeksiController from '../../controller/jadwalInspeksi.js';
import hasilInspeksiController from '../../controller/hasilInspeksi.js';
import validasi from '../../helper/validasi.js';
import auth from '../../controller/auth.js';

const routes = express.Router();

routes.route('/jadwal')
    .get(jadwalInspeksiController.getAllJadwalInspeksi)

routes.route('/hasil')
    .get(hasilInspeksiController.getAllHasilInspeksi)
    .post([auth.verifyToken, validasi.checkJabatanTeknisi], hasilInspeksiController.createHasilInspeksi);


export default routes;