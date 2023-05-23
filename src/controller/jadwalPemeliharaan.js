import jadwalPemeliharaanModel from "../models/jadwalPemeliharaan.js";
import response from "../helper/response.js";

export default {
    getAllJadwalInspeksi: async (req, res) => {
        try {
            const jadwalInspeksi = await jadwalPemeliharaanModel.find();
            response.sendOK(res, jadwalInspeksi);
        } catch (error) {
            response.sendForbidden(res, error.message);
        }
    },
    getJadwalById: async (req, res) => {
        const { id } = req.params;
        try {
            const jadwalInspeksi = await jadwalPemeliharaanModel.findById(id);
            response.sendOK(res, jadwalInspeksi);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    }
}