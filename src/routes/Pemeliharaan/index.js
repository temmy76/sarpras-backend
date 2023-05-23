import express from "express";
import hasilPemeliharaan from "../../controller/hasilPemeliharaan.js";

import validasi from "../../helper/validasi.js";
import auth from "../../controller/auth.js";

const routes = express.Router();

routes.route("/jadwal").get();

routes
	.route("/hasil")
	.get(hasilPemeliharaan.getAllHasilPemeliharaan)
	.post([auth.verifyToken, validasi.checkJabatanTeknisi]);

export default routes;
