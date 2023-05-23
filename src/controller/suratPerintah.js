import suratPerintahModel from "../models/suratPerintah.js";
import jadwalInspeksiModel from "../models/jadwalInspeksi.js";
import jadwalPemeliharaanModel from "../models/jadwalPemeliharaan.js";
import response from "../helper/response.js";
import jwt from "jsonwebtoken";

export default {
    getAllSuratPerintah: async (req, res) => {
        try {
            const suratPerintah = await suratPerintahModel.find();
            response.sendOK(res, suratPerintah);
        } catch (error) {
            response.sendForbidden(res, error.message);
        }
    },

    getSuratPerintahById: async (req, res) => {
        const { id } = req.params;
        try {
            const suratPerintah = await suratPerintahModel.findById(id);
            response.sendOK(res, suratPerintah);
        } catch (error) {
            response.sendNotFound(res, error.message);
        }
    },

    createSuratPerintah: async (req, res) => {
        const suratBody = {
            ...req.body.surat,
        };
        const jadwalBody = {
            ...req.body.jadwal,
        };
        const suratPerintah = new suratPerintahModel(suratBody);
        suratPerintah.toUpperCase();
        let jadwal;
        if (suratPerintah.jenis === 'INSPEKSI') {
            suratPerintah.refJadwal = 'jadwalinspeksis'
            jadwal = new jadwalInspeksiModel(jadwalBody);
        } else {
            suratPerintah.refJadwal = 'jadwalpemeliharaans'
            jadwalBody.prioritas = jadwalBody.prioritas.toUpperCase();
            jadwal = new jadwalPemeliharaanModel(jadwalBody);
        }
        suratPerintah.jadwal_id = jadwal._id;
        jadwal.surat_id = suratPerintah._id;

        try {
            const savedSuratPerintah = await suratPerintah.save();
            const savedJadwalInspeksi = await jadwal.save();
            response.sendCreated(res, {
                surat: savedSuratPerintah,
                jadwal: savedJadwalInspeksi,
            });
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },

    approveSuratPerintah: async (req, res) => {
        const { id } = req.params;
        const approveBy = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const { status } = req.body;
        try {
            const suratPerintah = await suratPerintahModel.findById(id);
            suratPerintah.approvedBy = approveBy;
            suratPerintah.status = status;
            suratPerintah.toUpperCase();
            const savedSuratPerintah = await suratPerintah.save();
            response.sendOK(res, savedSuratPerintah);
        } catch (error) {
            response.sendBadRequest(res, error.message);
        }
    },
}