import jadwalInspeksiModel from "../models/jadwalInspeksi.js";
import response from "../helper/response.js";

export default {
    getAllJadwalInspeksi: async (req, res) => {
        try {
            const jadwalInspeksi = await jadwalInspeksiModel.find();
            response.sendOK(res, jadwalInspeksi);
        } catch (error) {
            response.sendForbidden(res, error.message);
        }
    },
}