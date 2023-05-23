import suratPerintahModel from "../models/suratPerintah.js";
import jadwalInspeksiModel from "../models/jadwalInspeksi.js";
import saranaPrasaranaModel from "../models/saranaPrasarana.js";
import userModel from "../models/user.js";
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

    createSuratPerintah: async (req, res) => {
        const surat = {
            ...req.body.surat,
        };
        const jadwal = {
            ...req.body.jadwal,
        };
        const suratPerintah = new suratPerintahModel(surat);
        const jadwalIspeksi = new jadwalInspeksiModel(jadwal);
        suratPerintah.toUpperCase();
        suratPerintah.refJadwal = suratPerintah.jenis === 'INSPEKSI' ? 'jadwalinspeksis' : 'jadwalpemeliharaans';
        suratPerintah.tanggal = jadwalIspeksi._id;
        jadwalIspeksi.surat_id = suratPerintah._id;
    
        try {
            const savedSuratPerintah = await suratPerintah.save();
            const savedJadwalInspeksi = await jadwalIspeksi.save();
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

    checkJabatanTU: async (req, res, next) => {
        const user_id = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const user = await userModel.findById(user_id);

        if (user.jabatan === 'WADIR2' || user.jabatan === 'TEKNISI') {
            response.sendForbidden(res, "Anda tidak memiliki akses untuk membuat surat perintah");
            return;
        }
        next();
    },

    checkJabatanWD2: async (req, res, next) => {
        const user_id = jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET).id;
        const user = await userModel.findById(user_id);

        if (user.jabatan === 'SUB BAG TU' || user.jabatan === 'TEKNISI') {
            response.sendForbidden(res, "Anda tidak memiliki akses untuk menyetujui surat perintah");
            return;
        }
        next();
    },

    checkTeknisiNotInTask: async (req, res, next) => {
        const suratPerintah = await suratPerintahModel.find({ petugas_id: req.body.surat.petugas_id });
        let founded = false;
        suratPerintah.forEach((surat) => {
            if (surat.status === 'DITUGASKAN') {
                founded = true;
                response.sendUnprocessableEntity(res, "Teknisi sedang dalam tugas");     
            }
        });
        if (founded){
            return;
        }
        next();
    },

    checkSarprasNotInTask: async (req, res, next) => {
        const { items } = req.body.surat;
        
        for (let index = 0; index < items.length; index++) {
            let sarana = items[index];
            let saranaPrasarana = await saranaPrasaranaModel.findById(sarana);

            if (saranaPrasarana.status === 'PERBAIKAN' || saranaPrasarana.status === 'INSPEKSI') {
                response.sendUnprocessableEntity(res, "Sarana Prasarana sedang dalam perbaikan atau inspeksi");
                return;
            }
        }
        next();
    }
}