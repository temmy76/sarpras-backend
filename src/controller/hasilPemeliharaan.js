import hasilPemeliharaanModel from "../models/hasilPemeliharaan.js";
import jadwalPemeliharaanModel from "../models/jadwalPemeliharaan.js";
import suratPerintahModel from "../models/suratPerintah.js";
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
		hasilInspeksi.toUpperCase();
		try {
			const savedHasilPemeliharaan = await hasilPemeliharaan.save();
			// Update Status Surat Perintah to "SELESAI"
			const jadwal = await jadwalPemeliharaanModel.findById(
				savedHasilPemeliharaan.jadwal_id
			);
			const updateSuratPerintah = await suratPerintahModel.findByIdAndUpdate(
				jadwal.suratPerintah_id,
				{
					status: "SELESAI",
				},
				{ new: true }
			);

			// Get Surat Perintah
			const suratPerintah = await saranaPrasaranaModel.findById(
				jadwal.surat_id
			);
			suratPerintah.item.forEach(async (el) => {
				// Update Status Sarana Prasarana to "BAIK"
				const updateSaranaPrasana =
					await saranaPrasaranaModel.findByIdAndUpdate(
						el.saranaPrasarana_id,
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
