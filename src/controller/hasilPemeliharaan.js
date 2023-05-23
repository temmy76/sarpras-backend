import hasilPemeliharaanModel from "../models/hasilPemeliharaan.js";
import jadwalPemeliharaanModel from "../models/jadwalPemeliharaan.js";
import suratPerintahModel from "../models/suratPerintah.js";
import saranaPrasaranaModel from "../models/saranaPrasarana.js";
import response from "../helper/response.js";

export default {
	getAllHasilPemeliharaan: async (req, res) => {
		try {
			const hasilPemeliharaan = await hasilPemeliharaanModel.find();
			response.sendOK(res, hasilPemeliharaan);
		} catch (error) {
			response.sendBadRequest(res, error.message);
		}
	},
	createHasilPemeliharaan: async (req, res) => {
		const hasilPemeliharaan = new hasilPemeliharaanModel(req.body);
		try {
			const savedHasilPemeliharaan = await hasilPemeliharaan.save();
			const jadwal = await jadwalPemeliharaanModel.findById(
				savedHasilPemeliharaan.jadwal_id
			);
			const updateSuratPerintah = await suratPerintahModel.findByIdAndUpdate(
				jadwal.surat_id,
				{
					status: "SELESAI",
				},
				{ new: true }
			);
			console.log(jadwal)
			const suratPerintah = updateSuratPerintah;
			console.log(updateSuratPerintah)
			suratPerintah.items.forEach(async (el) => {
				const updateSaranaPrasana =
					await saranaPrasaranaModel.findByIdAndUpdate(
						el,
						{
							status: "BAIK",
						},
						{ new: true }
					);
			});
			response.sendCreated(res, savedHasilPemeliharaan);
		} catch (error) {
			response.sendBadRequest(res, error.message);
		}
	},
};
