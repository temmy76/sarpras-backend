import express from "express";
import hasilPemeliharaan from "../../controller/hasilPemeliharaan.js";
import jadwalPemeliharaan from "../../controller/jadwalPemeliharaan.js";

import validasi from "../../helper/validasi.js";
import auth from "../../controller/auth.js";

const routes = express.Router();

routes.route("/jadwal")
	.get(jadwalPemeliharaan.getAllJadwalInspeksi);

routes.route("/jadwal/:id")
	.get(jadwalPemeliharaan.getJadwalById);

routes.route("/hasil")
	.get(hasilPemeliharaan.getAllHasilPemeliharaan)
	.post([auth.verifyToken, validasi.checkJabatanTeknisi], hasilPemeliharaan.createHasilPemeliharaan);

export default routes;
