import hasilInspeksiModel from "../models/hasilInspeksi.js";
import suratPerintahModel from "../models/suratPerintah.js";
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
        const { id } = req.params;
        const hasilInspeksi = new hasilInspeksiModel({
            jadwal_id: id,
            ...req.body,
        });
        hasilInspeksi.toUpperCase();
        const suratPerintah = await suratPerintahModel.findOne({ tanggal: id });
        suratPerintah.status = "SELESAI";
        try {
            const savedHasilInspeksi = await hasilInspeksi.save();
            await suratPerintah.save();
            response.sendCreated(res, savedHasilInspeksi);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },
}
