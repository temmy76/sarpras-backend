import hasilInspeksiModel from "../models/hasilInspeksi.js";
import suratPerintahModel from "../models/suratPerintah.js";
import saranaPrasaranaModel from "../models/saranaPrasarana.js";
import response from "../helper/response.js";

export default {
    getAllHasilInspeksi: async (req, res) => {
        try {
            const hasilInspeksi = await hasilInspeksiModel.find();
            response.sendOK(res, hasilInspeksi);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },
    createHasilInspeksi: async (req, res) => {
        const hasilInspeksi = new hasilInspeksiModel({
            ...req.body,
        });
        hasilInspeksi.toUpperCase();
        const suratPerintah = await suratPerintahModel.findOne({ jadwal_id: req.body.jadwal_id });
        suratPerintah.status = "SELESAI";
        try {
            const savedHasilInspeksi = await hasilInspeksi.save();
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
            await suratPerintah.save();
            response.sendCreated(res, savedHasilInspeksi);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },
}
