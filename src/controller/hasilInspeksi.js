import hasilInspeksiModel from "../models/hasilInspeksi.js";
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
        const hasilInspeksi = new hasilInspeksiModel(req.body);
        hasilInspeksi.toUpperCase();
        try {
            const savedHasilInspeksi = await hasilInspeksi.save();
            response.sendCreated(res, savedHasilInspeksi);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },
    verifikasiHasilInspeksi: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const hasilInspeksi = await hasilInspeksiModel.findById(id);
            if (hasilInspeksi) {
                hasilInspeksi.status = status;
                await hasilInspeksi.save();
                response.sendOK(res, hasilInspeksi);
            } else {
                response.sendNotFound(res, "Hasil Inspeksi tidak ditemukan");
            }
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    }
}
